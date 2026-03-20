import { useDashboard } from "@/contexts/DashboardContext";
import { useNavigate } from "react-router-dom";
import { LayoutGrid, Pin, X, GripVertical } from "lucide-react";
// @ts-ignore
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import { ContentChart } from "@/components/ContentChart";

const ResponsiveGridLayout = WidthProvider(Responsive);

const Index = () => {
  const { pinnedItems, layouts, updateLayouts, unpinItem } = useDashboard();
  const navigate = useNavigate();

  if (pinnedItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-3.5rem)] p-8 animate-fade-up">
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
          <LayoutGrid className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2 text-balance text-center">
          Sua dashboard está vazia
        </h2>
        <p className="text-muted-foreground text-center max-w-md mb-6">
          Acesse seus projetos e fixe conteúdos aqui para criar um painel personalizado com os dados mais importantes para você.
        </p>
        <button
          onClick={() => navigate("/projetos")}
          className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 active:scale-[0.97] transition-all"
        >
          Ver projetos
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 animate-fade-up">
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

      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layouts }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={80}
        onLayoutChange={(layout) => updateLayouts(layout)}
        draggableHandle=".drag-handle"
        isResizable
        isDraggable
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
      </ResponsiveGridLayout>
    </div>
  );
};

export default Index;
