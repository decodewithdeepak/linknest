export interface Category {
  id?: number
  name: string
  color: string
}

export const useCategoryManager = () => {
  const categories = useState<Category[]>("categories", () => [])
  const isLoading = useState<boolean>("categories-loading", () => false)
  const error = useState<string | null>("categories-error", () => null)

  // Load categories from database on mount
  onMounted(async () => {
    await fetchCategories()
  })

  const fetchCategories = async () => {
    try {
      isLoading.value = true
      const response: any = await $fetch('/api/categories')
      
      if (response.success && response.categories) {
        categories.value = response.categories.map((cat: any) => ({
          id: cat.id,
          name: cat.name,
          color: cat.color
        }))
        console.log(`✅ Loaded ${categories.value.length} categories from database`)
        
        // If no categories exist, seed them
        if (categories.value.length === 0) {
          await seedCategories()
        }
      }
    } catch (e) {
      console.error("Failed to load categories from database:", e)
      error.value = "Failed to load categories"
    } finally {
      isLoading.value = false
    }
  }

  const seedCategories = async () => {
    try {
      const seedResponse: any = await $fetch('/api/categories/seed', { method: 'POST' })
      if (seedResponse.success && seedResponse.seeded) {
        // Fetch categories again after seeding
        await fetchCategories()
      }
    } catch (e) {
      console.error("Failed to seed categories:", e)
    }
  }

  const createCategory = async (name: string, color: string = "#6b7280"): Promise<boolean> => {
    if (!name) return false
    
    // Check if category already exists
    if (categories.value.some((c) => c.name.toLowerCase() === name.toLowerCase())) {
      return false
    }

    try {
      const response: any = await $fetch('/api/categories', {
        method: 'POST',
        body: { name, color }
      })
      
      if (response.success && response.category) {
        categories.value.push({
          id: response.category.id,
          name: response.category.name,
          color: response.category.color
        })
        console.log(`✅ Created category: ${name}`)
        return true
      }
      return false
    } catch (err) {
      console.error('Failed to create category:', err)
      error.value = 'Failed to create category'
      return false
    }
  }

  const updateCategory = async (
    categoryId: number,
    newName?: string,
    newColor?: string
  ): Promise<boolean> => {
    const category = categories.value.find((c) => c.id === categoryId)
    if (!category) return false

    try {
      const body: any = {}
      if (newName) body.name = newName
      if (newColor) body.color = newColor

      const response: any = await $fetch(`/api/categories/${categoryId}`, {
        method: 'PATCH',
        body
      })

      if (response.success && response.category) {
        category.name = response.category.name
        category.color = response.category.color
        console.log(`✅ Updated category: ${category.name}`)
        return true
      }
      return false
    } catch (err) {
      console.error('Failed to update category:', err)
      error.value = 'Failed to update category'
      return false
    }
  }

  const deleteCategory = async (categoryId: number): Promise<boolean> => {
    const category = categories.value.find((c) => c.id === categoryId)
    if (!category) return false

    try {
      await $fetch(`/api/categories/${categoryId}`, {
        method: 'DELETE'
      })

      // Remove the category from the list
      categories.value = categories.value.filter((c) => c.id !== categoryId)
      console.log(`✅ Deleted category: ${category.name}`)
      return true
    } catch (err) {
      console.error('Failed to delete category:', err)
      error.value = 'Failed to delete category'
      return false
    }
  }

  return {
    categories,
    isLoading,
    error,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory
  }
}

