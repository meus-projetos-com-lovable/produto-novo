import { projects, getStatusLabel, getStatusColor } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { Calendar, ArrowRight, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Projects() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="p-4 pb-20 animate-fade-up select-text">
        <div className="mb-4">
          <h2 className="text-base font-semibold text-foreground">Projetos</h2>
          <p className="text-xs text-muted-foreground">{projects.length} projetos ativos</p>
        </div>

        <div className="space-y-2.5">
          {projects.map((project, i) => (
            <button
              key={project.id}
              onClick={() => navigate(`/projetos/${project.id}`)}
              className="w-full text-left bg-card border rounded-xl p-3.5 hover:shadow-sm active:scale-[0.98] transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-sm text-foreground truncate flex-1 mr-2 select-text">{project.name}</h3>
                <span className={`shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-full ${getStatusColor(project.status)}`}>
                  {getStatusLabel(project.status)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-1 mb-2.5 select-text">{project.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${project.progress}%` }} />
                  </div>
                  <span className="text-xs font-semibold tabular-nums text-foreground">{project.progress}%</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-5xl animate-fade-up select-text">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground">Projetos</h2>
        <p className="text-sm text-muted-foreground">{projects.length} projetos ativos</p>
      </div>

      <div className="grid gap-3">
        {projects.map((project, i) => (
          <button
            key={project.id}
            onClick={() => navigate(`/projetos/${project.id}`)}
            className="w-full text-left bg-card border rounded-xl p-4 sm:p-5 hover:shadow-md hover:border-primary/20 active:scale-[0.995] transition-all group"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-foreground truncate select-text">{project.name}</h3>
                  <span className={`shrink-0 text-[11px] font-medium px-2 py-0.5 rounded-full ${getStatusColor(project.status)}`}>
                    {getStatusLabel(project.status)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1 select-text">{project.description}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1 select-text">
                    <Calendar className="h-3 w-3" />
                    {new Date(project.startDate).toLocaleDateString("pt-BR")} — {new Date(project.endDate).toLocaleDateString("pt-BR")}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground select-text">{project.category}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <p className="text-2xl font-semibold tabular-nums text-foreground">{project.progress}%</p>
                  <div className="w-20 h-1.5 bg-secondary rounded-full overflow-hidden mt-1">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${project.progress}%` }} />
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
