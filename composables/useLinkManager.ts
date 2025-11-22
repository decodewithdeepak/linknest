import type { Link } from "../types/link";

export interface CustomCategory {
  name: string;
  color: string;
}

export const useLinkManager = () => {
  const links = useState<Link[]>("links", () => []);
  const customCategories = useState<CustomCategory[]>(
    "custom-categories",
    () => []
  );
  const isLoading = useState<boolean>("links-loading", () => false);
  const error = useState<string | null>("links-error", () => null);

  // Load links from database on mount
  onMounted(async () => {
    try {
      // Fetch links from the database
      const response = await $fetch('/api/links')
      if (response.success && response.links) {
        // Transform database links to match the Link interface
        links.value = response.links.map((dbLink: any) => ({
          id: dbLink.id.toString(),
          url: dbLink.url,
          title: dbLink.title || dbLink.url,
          description: dbLink.description || '',
          image: dbLink.image || null,
          favicon: `https://www.google.com/s2/favicons?domain=${new URL(dbLink.url).hostname}&sz=128`,
          siteName: new URL(dbLink.url).hostname,
          category: dbLink.category || 'Other',
          dateAdded: dbLink.created_at,
          isFavorite: dbLink.is_favorite || false,
        }))
        console.log(`✅ Loaded ${links.value.length} links from database`)
      }
    } catch (e) {
      console.error("Failed to load links from database:", e)
      // Fallback to localStorage if database fetch fails
      const savedLinks = localStorage.getItem("link-nest-links");
      if (savedLinks) {
        try {
          links.value = JSON.parse(savedLinks);
        } catch (e) {
          console.error("Failed to parse saved links", e);
        }
      }
    }

    // Load custom categories from localStorage (these are UI-only)
    const savedCategories = localStorage.getItem("link-nest-categories");
    if (savedCategories) {
      try {
        customCategories.value = JSON.parse(savedCategories);
      } catch (e) {
        console.error("Failed to parse saved categories", e);
      }
    }
  });

  // Watch for changes and save to local storage
  watch(
    links,
    (newLinks) => {
      try {
        localStorage.setItem("link-nest-links", JSON.stringify(newLinks));
      } catch (e) {
        console.error("Failed to save links to localStorage:", e);
        error.value = "Failed to save changes. Storage may be full.";
      }
    },
    { deep: true }
  );

  watch(
    customCategories,
    (newCategories) => {
      try {
        localStorage.setItem(
          "link-nest-categories",
          JSON.stringify(newCategories)
        );
      } catch (e) {
        console.error("Failed to save categories to localStorage:", e);
        error.value = "Failed to save categories. Storage may be full.";
      }
    },
    { deep: true }
  );

  const fetchMetadata = async (url: string) => {
    try {
      // Call our internal server API
      const data = await $fetch("/api/metadata", {
        params: { url },
      });
      return data;
    } catch (err) {
      console.error("Metadata fetch error:", err);
      throw err;
    }
  };

  const categorizeLink = (metadata: any): string => {
    const { title, description, siteName, url } = metadata;
    const text = `${title} ${description} ${siteName} ${url}`.toLowerCase();

    // Simple keyword-based categorization (simulating AI)
    if (
      text.includes("github") ||
      text.includes("gitlab") ||
      text.includes("repo") ||
      text.includes("open source")
    ) {
      return "Open Source";
    }
    if (
      text.includes("portfolio") ||
      text.includes("resume") ||
      text.includes("cv") ||
      text.includes("personal website")
    ) {
      return "Portfolio";
    }
    if (
      text.includes("blog") ||
      text.includes("article") ||
      text.includes("medium") ||
      text.includes("dev.to") ||
      text.includes("news")
    ) {
      return "Blog";
    }
    if (
      text.includes("tool") ||
      text.includes("utility") ||
      text.includes("generator") ||
      text.includes("converter") ||
      text.includes("app")
    ) {
      return "Tool";
    }
    if (
      text.includes("learn") ||
      text.includes("course") ||
      text.includes("tutorial") ||
      text.includes("docs") ||
      text.includes("guide")
    ) {
      return "Learning";
    }
    if (
      text.includes("youtube") ||
      text.includes("video") ||
      text.includes("stream") ||
      text.includes("movie")
    ) {
      return "Video";
    }
    if (
      text.includes("design") ||
      text.includes("ui") ||
      text.includes("ux") ||
      text.includes("figma") ||
      text.includes("dribbble")
    ) {
      return "Design";
    }

    return "Other";
  };

  const addLink = async (url: string) => {
    if (!url) return;

    // Check if link already exists
    if (links.value.some((l) => l.url === url)) {
      error.value = "Link already exists";
      return;
    }

    isLoading.value = true;
    error.value = null;

    try {
      // Validate URL first
      let parsedUrl: URL;
      try {
        parsedUrl = new URL(url);
      } catch {
        error.value = "Invalid URL. Please enter a valid URL.";
        isLoading.value = false;
        return;
      }

      const metadata = await fetchMetadata(url);
      const category = categorizeLink(metadata);

      // Save to database
      const response = await $fetch('/api/links', {
        method: 'POST',
        body: {
          url: metadata.url || url,
          title: metadata.title || url,
          description: metadata.description || '',
          image: metadata.image || null,
          category,
        }
      })

      if (response.success && response.link) {
        // Get favicon from Google's service as a reliable fallback
        const favicon = `https://www.google.com/s2/favicons?domain=${parsedUrl.hostname}&sz=128`;

        const newLink: Link = {
          id: response.link.id.toString(),
          url: response.link.url,
          title: response.link.title || response.link.url,
          description: response.link.description || "",
          image: response.link.image || null,
          favicon: favicon,
          siteName: metadata.siteName || parsedUrl.hostname,
          category: response.link.category,
          dateAdded: response.link.created_at,
          isFavorite: response.link.is_favorite || false,
        };

        links.value.unshift(newLink);
        error.value = null; // Clear any previous errors
      }
    } catch (err: any) {
      console.error(err);
      error.value = err.data?.message || "Failed to add link. Please try again.";
    } finally {
      isLoading.value = false;
    }
  };

  const removeLink = async (id: string) => {
    try {
      await $fetch(`/api/links/${id}`, {
        method: 'DELETE'
      })
      links.value = links.value.filter((l) => l.id !== id);
    } catch (err) {
      console.error('Failed to delete link:', err)
      error.value = 'Failed to delete link'
    }
  };

  const toggleFavorite = async (id: string) => {
    const link = links.value.find((l) => l.id === id);
    if (link) {
      const newFavoriteState = !link.isFavorite;
      try {
        await $fetch(`/api/links/${id}/favorite`, {
          method: 'PATCH',
          body: { isFavorite: newFavoriteState }
        })
        link.isFavorite = newFavoriteState;
      } catch (err) {
        console.error('Failed to toggle favorite:', err)
        error.value = 'Failed to update favorite status'
      }
    }
  };

  const createCategory = (name: string, color: string = "#6b7280") => {
    if (
      name &&
      !customCategories.value.some(
        (c) => c.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      customCategories.value.push({ name, color });
      return true;
    }
    return false;
  };

  const updateCategory = (
    oldName: string,
    newName: string,
    newColor?: string
  ) => {
    const category = customCategories.value.find((c) => c.name === oldName);
    if (category) {
      // Update category name and color
      const oldCategoryName = category.name;
      category.name = newName;
      if (newColor) {
        category.color = newColor;
      }

      // Update all links that have this category
      links.value.forEach((link) => {
        if (link.category === oldCategoryName) {
          link.category = newName;
        }
      });
    }
  };

  const deleteCategory = (name: string) => {
    // Move all links from this category to "Other"
    links.value.forEach((link) => {
      if (link.category === name) {
        link.category = "Other";
      }
    });

    // Remove the category from custom categories
    customCategories.value = customCategories.value.filter(
      (c) => c.name !== name
    );
  };

  const updateLinkCategory = async (linkId: string, newCategory: string) => {
    const link = links.value.find((l) => l.id === linkId);
    if (link) {
      try {
        await $fetch(`/api/links/${linkId}/category`, {
          method: 'PATCH',
          body: { category: newCategory }
        })
        link.category = newCategory;
      } catch (err) {
        console.error('Failed to update category:', err)
        error.value = 'Failed to update category'
      }
    }
  };

  return {
    links,
    customCategories,
    isLoading,
    error,
    addLink,
    removeLink,
    toggleFavorite,
    createCategory,
    updateCategory,
    deleteCategory,
    updateLinkCategory,
  };
};
