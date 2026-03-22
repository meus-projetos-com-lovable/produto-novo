import { useParams, useNavigate } from "react-router-dom";
import { projects, getStatusLabel, getStatusColor } from "@/data/mockData";
import { useDashboard } from "@/contexts/DashboardContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentChart } from "@/components/ContentChart";
import { ArrowLeft, CheckCircle2, Circle, Pin, PinOff, Download, FileText, Image, Presentation, BarChart3, Send } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useState } from "react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pinItem, unpinItem, isPinned } = useDashboard();
  const [feedback, setFeedback] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const isMobile = useIsMobile();

  const project = projects.find((p) => p.id === id);
  if (!project) return <div className="p-8 text-center text-muted-foreground">Projeto não encontrado</div>;

  const handlePin = (content: typeof project.contents[0]) => {
    if (isPinned(content.id)) {
      const item = JSON.parse(localStorage.getItem("dashboard_pinned") || "[]").find((p: any) => p.contentId === content.id);
      if (item) unpinItem(item.id);
      toast.success("Conteúdo removido da dashboard");
    } else {
      pinItem({
        id: `pin-${Date.now()}`,
        contentId: content.id,
        projectId: project.id,
        projectName: project.name,
        contentTitle: content.title,
        contentDescription: content.description,
        contentType: content.type,
        chartType: content.chartType,
        chartData: content.chartData,
      });
      toast.success("Conteúdo fixado na dashboard!");
      navigate("/");
    }
  };

  const sendFeedback = () => {
    if (!feedback.trim()) return;
    toast.success("Observação enviada com sucesso!");
    setFeedback("");
    setShowFeedback(false);
  };

  const contentIcon = (type: string) => {
    const icons: Record<string, typeof FileText> = { pdf: FileText, pptx: Presentation, image: Image, chart: BarChart3, dashboard: BarChart3 };
    const Icon = icons[type] || FileText;
    return <Icon className="h-5 w-5" />;
  };

  return (
    <div className={`animate-fade-up ${isMobile ? "p-4 pb-20" : "p-4 sm:p-6 max-w-5xl"}`}>
      {/* Header */}
      <button onClick={() => navigate("/projetos")} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-3 sm:mb-4 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Voltar
      </button>

      {isMobile ? (
        /* Mobile project header */
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1.5">
            <h2 className="text-base font-semibold text-foreground leading-tight">{project.name}</h2>
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${getStatusColor(project.status)}`}>
              {getStatusLabel(project.status)}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">{project.description}</p>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: `${project.progress}%` }} />
            </div>
            <span className="text-sm font-bold tabular-nums text-foreground">{project.progress}%</span>
          </div>
        </div>
      ) : (
        /* Desktop project header */
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-semibold text-foreground">{project.name}</h2>
              <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${getStatusColor(project.status)}`}>
                {getStatusLabel(project.status)}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{project.description}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-3xl font-bold tabular-nums text-foreground">{project.progress}%</p>
            <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden mt-1">
              <div className="h-full bg-primary rounded-full" style={{ width: `${project.progress}%` }} />
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <Tabs defaultValue="andamento" className="space-y-3 sm:space-y-4">
        <TabsList className="bg-secondary w-full sm:w-auto">
          <TabsTrigger value="andamento" className="flex-1 sm:flex-none text-xs sm:text-sm">Andamento</TabsTrigger>
          <TabsTrigger value="conteudo" className="flex-1 sm:flex-none text-xs sm:text-sm">Conteúdo</TabsTrigger>
        </TabsList>

        <TabsContent value="andamento" className="space-y-4 sm:space-y-6">
          {/* Progress chart */}
          <div className="bg-card border rounded-xl p-3.5 sm:p-5">
            <h3 className="text-xs sm:text-sm font-medium mb-3 sm:mb-4">Progresso ao longo do tempo</h3>
            <div className={isMobile ? "h-48" : "h-64"}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={project.progressHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(150, 10%, 88%)" />
                  <XAxis dataKey="month" tick={{ fontSize: isMobile ? 10 : 12 }} stroke="hsl(210, 10%, 46%)" />
                  <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} stroke="hsl(210, 10%, 46%)" domain={[0, 100]} width={isMobile ? 30 : 40} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                  {!isMobile && <Legend />}
                  <Line type="monotone" dataKey="planned" name="Planejado" stroke="hsl(210, 80%, 55%)" strokeWidth={2} strokeDasharray="5 5" dot={{ r: isMobile ? 2 : 3 }} />
                  <Line type="monotone" dataKey="actual" name="Realizado" stroke="hsl(174, 62%, 40%)" strokeWidth={2} dot={{ r: isMobile ? 3 : 4, fill: "hsl(174, 62%, 40%)" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Milestones */}
          <div className="bg-card border rounded-xl p-3.5 sm:p-5">
            <h3 className="text-xs sm:text-sm font-medium mb-3 sm:mb-4">Marcos do Projeto</h3>
            <div className="space-y-2.5 sm:space-y-3">
              {project.milestones.map((m) => (
                <div key={m.id} className="flex items-center gap-2.5 sm:gap-3">
                  {m.completed ? (
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-status-success shrink-0" />
                  ) : (
                    <Circle className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground/40 shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs sm:text-sm ${m.completed ? "text-foreground" : "text-muted-foreground"}`}>{m.title}</p>
                  </div>
                  <span className="text-[10px] sm:text-xs text-muted-foreground tabular-nums shrink-0">{new Date(m.date).toLocaleDateString("pt-BR")}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Feedback */}
          <div className="bg-card border rounded-xl p-3.5 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs sm:text-sm font-medium">Observações</h3>
              {!showFeedback && (
                <button onClick={() => setShowFeedback(true)} className="text-xs font-medium text-primary hover:underline flex items-center gap-1">
                  <Send className="h-3 w-3" /> Mandar observação
                </button>
              )}
            </div>
            {showFeedback && (
              <div className="space-y-3">
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Escreva sua observação..."
                  className="w-full min-h-[80px] rounded-lg border bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <div className="flex gap-2 justify-end">
                  <button onClick={() => setShowFeedback(false)} className="px-3 py-1.5 text-sm rounded-lg hover:bg-secondary transition-colors">
                    Cancelar
                  </button>
                  <button onClick={sendFeedback} className="px-4 py-1.5 text-sm rounded-lg bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.97] transition-all">
                    Enviar
                  </button>
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="conteudo" className="space-y-3">
          {project.contents.map((content) => {
            const pinned = isPinned(content.id);
            return (
              <div key={content.id} className="bg-card border rounded-xl overflow-hidden">
                <div className="p-3.5 sm:p-5">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-secondary text-muted-foreground shrink-0">
                      {contentIcon(content.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-medium">{content.title}</h4>
                      <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">{content.description}</p>
                      <div className={`flex gap-2 mt-2.5 sm:mt-3 ${isMobile ? "flex-col" : ""}`}>
                        <button className="flex items-center justify-center gap-1.5 text-xs font-medium px-3 py-2 sm:py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                          <Download className="h-3 w-3" /> Download
                        </button>
                        <button
                          onClick={() => handlePin(content)}
                          className={`flex items-center justify-center gap-1.5 text-xs font-medium px-3 py-2 sm:py-1.5 rounded-lg transition-colors ${
                            pinned
                              ? "bg-primary/10 text-primary hover:bg-primary/20"
                              : "bg-secondary hover:bg-secondary/80"
                          }`}
                        >
                          {pinned ? <PinOff className="h-3 w-3" /> : <Pin className="h-3 w-3" />}
                          {pinned ? "Desfixar" : "Fixar na dashboard"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {content.chartData && content.chartType && (
                  <div className={`border-t px-3 sm:px-4 py-3 ${isMobile ? "h-40" : "h-48"}`}>
                    <ContentChart type={content.chartType} data={content.chartData} />
                  </div>
                )}
              </div>
            );
          })}
        </TabsContent>
      </Tabs>
    </div>
  );
}
