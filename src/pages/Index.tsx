import { useDashboard } from "@/contexts/DashboardContext";
import { useNavigate } from "react-router-dom";
import { LayoutGrid, Pin, X, GripVertical } from "lucide-react";
import { GridLayout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import { ContentChart } from "@/components/ContentChart";
import { useRef, useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const { pinnedItems, layouts, updateLayouts, unpinItem } = useDashboard();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(1200);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  if (pinnedItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-3.5rem)] p-6 sm:p-8 animate-fade-up">
        <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 mb-5 sm:mb-6">
          <LayoutGrid className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
        </div>
        <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-2 text-balance text-center">
          Sua dashboard está vazia
        </h2>
        <p className="text-sm text-muted-foreground text-center max-w-md mb-5 sm:mb-6 px-4">
          Acesse seus projetos e fixe conteúdos aqui para criar um painel personalizado.
        </p>
        <button
          onClick={() => navigate("/projetos")}
          className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 active:scale-[0.97] transition-all w-full sm:w-auto max-w-xs"
        >
          Ver projetos
        </button>
      </div>
    );
  }

  // Mobile: stack cards vertically
  if (isMobile) {
    return (
      <div className="p-4 pb-20 animate-fade-up">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-semibold text-foreground">Minha Dashboard</h2>
            <p className="text-xs text-muted-foreground">{pinnedItems.length} itens fixados</p>
          </div>
        </div>
        <div className="space-y-3">
          {pinnedItems.map((item) => (
            <div key={item.id} className="bg-card rounded-xl border shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2.5 border-b bg-secondary/30">
                <div className="min-w-0">
                  <p className="text-xs font-medium truncate">{item.contentTitle}</p>
                  <p className="text-[10px] text-muted-foreground truncate">{item.projectName}</p>
                </div>
                <button
                  onClick={() => unpinItem(item.id)}
                  className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors shrink-0 ml-2"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="p-3 h-48">
                {item.chartData && item.chartType ? (
                  <ContentChart type={item.chartType as any} data={item.chartData} />
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                    <Pin className="h-5 w-5 mb-2 opacity-40" />
                    <p className="text-xs">{item.contentType === "pdf" ? "Documento PDF" : item.contentType === "pptx" ? "Apresentação" : item.contentType === "image" ? "Imagem" : "Conteúdo"}</p>
                    <p className="text-[10px] mt-1">{item.contentDescription}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 animate-fade-up" ref={containerRef}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Minha Dashboard</h2>
          <p className="text-sm text-muted-foreground">{pinnedItems.length} itens fixados</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary px-3 py-1.5 rounded-lg">
          <GripVertical className="h-3 w-3" />
          Arraste e redimensione
        </div>
      </div>

      {/* @ts-ignore - react-grid-layout v2 API */}
      <GridLayout
        width={width}
        layout={layouts as any}
        gridConfig={{ cols: 12, rowHeight: 80, margin: [12, 12] as any }}
        dragConfig={{ enabled: true, handle: ".drag-handle" }}
        resizeConfig={{ enabled: true }}
        onLayoutChange={(layout: any) => updateLayouts(layout)}
      >
        {pinnedItems.map((item) => (
          <div key={item.id} className="bg-card rounded-xl border shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-3 py-2 border-b bg-secondary/30 shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <div className="drag-handle cursor-grab active:cursor-grabbing p-0.5 rounded hover:bg-secondary">
                  <GripVertical className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium truncate">{item.contentTitle}</p>
                  <p className="text-[10px] text-muted-foreground truncate">{item.projectName}</p>
                </div>
              </div>
              <button
                onClick={() => unpinItem(item.id)}
                className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors shrink-0"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="flex-1 p-3 min-h-0">
              {item.chartData && item.chartType ? (
                <ContentChart type={item.chartType as any} data={item.chartData} />
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                  <Pin className="h-5 w-5 mb-2 opacity-40" />
                  <p className="text-xs">{item.contentType === "pdf" ? "Documento PDF" : item.contentType === "pptx" ? "Apresentação" : item.contentType === "image" ? "Imagem" : "Conteúdo"}</p>
                  <p className="text-[10px] mt-1">{item.contentDescription}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </GridLayout>
    </div>
  );
};

export default Index;
