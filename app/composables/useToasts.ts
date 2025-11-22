export const useToasts = () => {
  const toast = useToast();

  const toastUi = {
    root: "bg-card/95 border border-border backdrop-blur-md",
    wrapper: "w-full flex-1 flex flex-col",
    title: "text-sm font-semibold text-foreground",
    description: "text-sm text-muted-foreground",
    progress: "h-1",
  };

  const showToast = (opts: Record<string, any>) => {
    const { ui, ...rest } = opts || {};
    toast.add({
      ...rest,
      ui: {
        ...toastUi,
        ...(ui || {}),
      },
    });
  };

  return { showToast, toastUi };
};
