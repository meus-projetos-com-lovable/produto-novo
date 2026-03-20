import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface PinnedItem {
  id: string;
  contentId: string;
  projectId: string;
  projectName: string;
  contentTitle: string;
  contentDescription: string;
  contentType: string;
  chartType?: string;
  chartData?: { name: string; value: number }[];
}

interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
}

interface DashboardContextType {
  pinnedItems: PinnedItem[];
  layouts: LayoutItem[];
  pinItem: (item: PinnedItem) => void;
  unpinItem: (id: string) => void;
  updateLayouts: (layouts: LayoutItem[]) => void;
  isPinned: (contentId: string) => boolean;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

const STORAGE_KEY = "dashboard_pinned";
const LAYOUT_KEY = "dashboard_layouts";

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [pinnedItems, setPinnedItems] = useState<PinnedItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [layouts, setLayouts] = useState<Layout[]>(() => {
    const saved = localStorage.getItem(LAYOUT_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pinnedItems));
  }, [pinnedItems]);

  useEffect(() => {
    localStorage.setItem(LAYOUT_KEY, JSON.stringify(layouts));
  }, [layouts]);

  const pinItem = useCallback((item: PinnedItem) => {
    setPinnedItems((prev) => {
      if (prev.find((p) => p.contentId === item.contentId)) return prev;
      const newItems = [...prev, item];
      // add layout entry
      setLayouts((prevL) => [
        ...prevL,
        { i: item.id, x: (prevL.length * 4) % 12, y: Infinity, w: 4, h: 3, minW: 2, minH: 2 },
      ]);
      return newItems;
    });
  }, []);

  const unpinItem = useCallback((id: string) => {
    setPinnedItems((prev) => prev.filter((p) => p.id !== id));
    setLayouts((prev) => prev.filter((l) => l.i !== id));
  }, []);

  const updateLayouts = useCallback((newLayouts: Layout[]) => {
    setLayouts(newLayouts);
  }, []);

  const isPinned = useCallback(
    (contentId: string) => pinnedItems.some((p) => p.contentId === contentId),
    [pinnedItems]
  );

  return (
    <DashboardContext.Provider value={{ pinnedItems, layouts, pinItem, unpinItem, updateLayouts, isPinned }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboard must be used within DashboardProvider");
  return ctx;
}
