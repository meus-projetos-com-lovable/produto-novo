export type ProjectStatus = "em_andamento" | "concluido" | "atrasado";

export interface ProjectContent {
  id: string;
  projectId: string;
  type: "image" | "pdf" | "pptx" | "chart" | "dashboard";
  title: string;
  description: string;
  thumbnail?: string;
  chartData?: { name: string; value: number }[];
  chartType?: "bar" | "line" | "pie" | "area";
}

export interface ProjectMilestone {
  id: string;
  title: string;
  completed: boolean;
  date: string;
}

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  startDate: string;
  endDate: string;
  description: string;
  progress: number;
  category: string;
  milestones: ProjectMilestone[];
  contents: ProjectContent[];
  progressHistory: { month: string; planned: number; actual: number }[];
}

const statusLabels: Record<ProjectStatus, string> = {
  em_andamento: "Em andamento",
  concluido: "Concluído",
  atrasado: "Atrasado",
};

export const getStatusLabel = (s: ProjectStatus) => statusLabels[s];

export const getStatusColor = (s: ProjectStatus) => {
  const map: Record<ProjectStatus, string> = {
    em_andamento: "bg-status-info/15 text-status-info",
    concluido: "bg-status-success/15 text-status-success",
    atrasado: "bg-status-danger/15 text-status-danger",
  };
  return map[s];
};

export const projects: Project[] = [
  {
    id: "proj-1",
    name: "Reestruturação Financeira Q1",
    status: "concluido",
    startDate: "2025-01-10",
    endDate: "2025-03-28",
    description: "Revisão completa da estrutura financeira incluindo otimização de custos, análise de fluxo de caixa e projeções de rentabilidade para o primeiro trimestre.",
    progress: 100,
    category: "Finanças",
    milestones: [
      { id: "m1", title: "Diagnóstico inicial", completed: true, date: "2025-01-20" },
      { id: "m2", title: "Plano de ação", completed: true, date: "2025-02-10" },
      { id: "m3", title: "Implementação", completed: true, date: "2025-03-15" },
      { id: "m4", title: "Entrega final", completed: true, date: "2025-03-28" },
    ],
    contents: [
      { id: "c1", projectId: "proj-1", type: "chart", title: "Fluxo de Caixa Projetado", description: "Projeção trimestral", chartType: "area", chartData: [
        { name: "Jan", value: 120000 }, { name: "Fev", value: 145000 }, { name: "Mar", value: 168000 },
        { name: "Abr", value: 190000 }, { name: "Mai", value: 210000 }, { name: "Jun", value: 235000 },
      ]},
      { id: "c2", projectId: "proj-1", type: "pdf", title: "Relatório Final Q1", description: "Documento completo com análises e recomendações" },
      { id: "c3", projectId: "proj-1", type: "dashboard", title: "Dashboard de Custos", description: "Painel interativo de controle de custos", chartType: "bar", chartData: [
        { name: "RH", value: 85000 }, { name: "Infra", value: 42000 }, { name: "Marketing", value: 28000 },
        { name: "Operações", value: 63000 }, { name: "TI", value: 51000 },
      ]},
    ],
    progressHistory: [
      { month: "Jan", planned: 25, actual: 22 }, { month: "Fev", planned: 55, actual: 58 },
      { month: "Mar", planned: 100, actual: 100 },
    ],
  },
  {
    id: "proj-2",
    name: "Dashboard de Vendas Regional",
    status: "em_andamento",
    startDate: "2025-02-01",
    endDate: "2025-05-30",
    description: "Desenvolvimento de dashboard interativo para acompanhamento de vendas por região, com integração de dados em tempo real e alertas automatizados.",
    progress: 62,
    category: "Tecnologia",
    milestones: [
      { id: "m5", title: "Levantamento de requisitos", completed: true, date: "2025-02-15" },
      { id: "m6", title: "Prototipação", completed: true, date: "2025-03-01" },
      { id: "m7", title: "Desenvolvimento", completed: false, date: "2025-04-15" },
      { id: "m8", title: "Testes e deploy", completed: false, date: "2025-05-30" },
    ],
    contents: [
      { id: "c4", projectId: "proj-2", type: "chart", title: "Vendas por Região", description: "Comparativo regional", chartType: "bar", chartData: [
        { name: "Sudeste", value: 4200 }, { name: "Sul", value: 2800 }, { name: "Nordeste", value: 1900 },
        { name: "Centro-Oeste", value: 1500 }, { name: "Norte", value: 800 },
      ]},
      { id: "c5", projectId: "proj-2", type: "image", title: "Wireframe do Dashboard", description: "Layout aprovado pelo cliente" },
      { id: "c6", projectId: "proj-2", type: "pptx", title: "Apresentação de Progresso", description: "Status atual para stakeholders" },
    ],
    progressHistory: [
      { month: "Fev", planned: 20, actual: 18 }, { month: "Mar", planned: 45, actual: 42 },
      { month: "Abr", planned: 75, actual: 62 },
    ],
  },
  {
    id: "proj-3",
    name: "Migração ERP para Cloud",
    status: "em_andamento",
    startDate: "2025-01-15",
    endDate: "2025-06-30",
    description: "Migração completa do sistema ERP legado para infraestrutura em nuvem, incluindo modernização de processos e treinamento de equipes.",
    progress: 45,
    category: "Tecnologia",
    milestones: [
      { id: "m9", title: "Análise de infraestrutura", completed: true, date: "2025-02-01" },
      { id: "m10", title: "Plano de migração", completed: true, date: "2025-03-01" },
      { id: "m11", title: "Migração de dados", completed: false, date: "2025-04-30" },
      { id: "m12", title: "Go-live", completed: false, date: "2025-06-30" },
    ],
    contents: [
      { id: "c7", projectId: "proj-3", type: "dashboard", title: "Status da Migração", description: "Acompanhamento em tempo real", chartType: "pie", chartData: [
        { name: "Migrado", value: 45 }, { name: "Em progresso", value: 20 }, { name: "Pendente", value: 35 },
      ]},
      { id: "c8", projectId: "proj-3", type: "pdf", title: "Plano de Migração v2", description: "Documento técnico atualizado" },
    ],
    progressHistory: [
      { month: "Jan", planned: 10, actual: 8 }, { month: "Fev", planned: 25, actual: 22 },
      { month: "Mar", planned: 45, actual: 45 },
    ],
  },
  {
    id: "proj-4",
    name: "Análise de Risco de Crédito",
    status: "atrasado",
    startDate: "2025-01-05",
    endDate: "2025-03-15",
    description: "Desenvolvimento de modelo preditivo para análise de risco de crédito utilizando machine learning e dados históricos da carteira.",
    progress: 68,
    category: "Finanças",
    milestones: [
      { id: "m13", title: "Coleta de dados", completed: true, date: "2025-01-20" },
      { id: "m14", title: "Feature engineering", completed: true, date: "2025-02-10" },
      { id: "m15", title: "Treinamento do modelo", completed: true, date: "2025-02-28" },
      { id: "m16", title: "Validação e deploy", completed: false, date: "2025-03-15" },
    ],
    contents: [
      { id: "c9", projectId: "proj-4", type: "chart", title: "Curva ROC do Modelo", description: "Performance preditiva", chartType: "line", chartData: [
        { name: "0.0", value: 0 }, { name: "0.2", value: 55 }, { name: "0.4", value: 78 },
        { name: "0.6", value: 89 }, { name: "0.8", value: 95 }, { name: "1.0", value: 100 },
      ]},
      { id: "c10", projectId: "proj-4", type: "pptx", title: "Resultados Preliminares", description: "Apresentação para comitê de risco" },
    ],
    progressHistory: [
      { month: "Jan", planned: 30, actual: 25 }, { month: "Fev", planned: 70, actual: 55 },
      { month: "Mar", planned: 100, actual: 68 },
    ],
  },
  {
    id: "proj-5",
    name: "Rebranding Corporativo",
    status: "em_andamento",
    startDate: "2025-02-15",
    endDate: "2025-05-15",
    description: "Redesenho completo da identidade visual incluindo logotipo, paleta de cores, tipografia e materiais de comunicação.",
    progress: 38,
    category: "Design",
    milestones: [
      { id: "m17", title: "Pesquisa de marca", completed: true, date: "2025-03-01" },
      { id: "m18", title: "Conceitos iniciais", completed: true, date: "2025-03-20" },
      { id: "m19", title: "Refinamento", completed: false, date: "2025-04-15" },
      { id: "m20", title: "Manual de marca", completed: false, date: "2025-05-15" },
    ],
    contents: [
      { id: "c11", projectId: "proj-5", type: "image", title: "Conceitos de Logo", description: "3 opções de direção criativa" },
      { id: "c12", projectId: "proj-5", type: "pdf", title: "Moodboard Aprovado", description: "Referências visuais e paleta" },
      { id: "c13", projectId: "proj-5", type: "chart", title: "Pesquisa de Percepção", description: "Resultados da pesquisa de marca", chartType: "bar", chartData: [
        { name: "Confiança", value: 72 }, { name: "Inovação", value: 58 }, { name: "Tradição", value: 85 },
        { name: "Modernidade", value: 43 },
      ]},
    ],
    progressHistory: [
      { month: "Fev", planned: 15, actual: 12 }, { month: "Mar", planned: 40, actual: 38 },
    ],
  },
  {
    id: "proj-6",
    name: "Automação de Processos Fiscais",
    status: "concluido",
    startDate: "2024-10-01",
    endDate: "2025-01-31",
    description: "Implementação de RPA para automatização de processos fiscais repetitivos, reduzindo tempo de processamento em 74%.",
    progress: 100,
    category: "Tecnologia",
    milestones: [
      { id: "m21", title: "Mapeamento de processos", completed: true, date: "2024-10-20" },
      { id: "m22", title: "Desenvolvimento dos bots", completed: true, date: "2024-12-01" },
      { id: "m23", title: "Testes", completed: true, date: "2025-01-10" },
      { id: "m24", title: "Implantação", completed: true, date: "2025-01-31" },
    ],
    contents: [
      { id: "c14", projectId: "proj-6", type: "dashboard", title: "Métricas de Automação", description: "Eficiência operacional", chartType: "bar", chartData: [
        { name: "Antes", value: 480 }, { name: "Depois", value: 125 },
      ]},
      { id: "c15", projectId: "proj-6", type: "pdf", title: "Manual de Operação", description: "Guia completo dos processos automatizados" },
    ],
    progressHistory: [
      { month: "Out", planned: 20, actual: 18 }, { month: "Nov", planned: 50, actual: 48 },
      { month: "Dez", planned: 80, actual: 82 }, { month: "Jan", planned: 100, actual: 100 },
    ],
  },
  {
    id: "proj-7",
    name: "Planejamento Estratégico 2025-2027",
    status: "em_andamento",
    startDate: "2025-03-01",
    endDate: "2025-07-31",
    description: "Construção do plano estratégico trienal com definição de metas, KPIs e roadmap de iniciativas prioritárias.",
    progress: 22,
    category: "Estratégia",
    milestones: [
      { id: "m25", title: "Análise SWOT", completed: true, date: "2025-03-15" },
      { id: "m26", title: "Workshops com liderança", completed: false, date: "2025-04-15" },
      { id: "m27", title: "Documento estratégico", completed: false, date: "2025-06-30" },
      { id: "m28", title: "Aprovação do board", completed: false, date: "2025-07-31" },
    ],
    contents: [
      { id: "c16", projectId: "proj-7", type: "chart", title: "Análise SWOT Quantitativa", description: "Pontuação dos fatores estratégicos", chartType: "bar", chartData: [
        { name: "Forças", value: 82 }, { name: "Fraquezas", value: 45 },
        { name: "Oportunidades", value: 73 }, { name: "Ameaças", value: 38 },
      ]},
      { id: "c17", projectId: "proj-7", type: "pptx", title: "Kickoff Estratégico", description: "Apresentação inicial para o comitê" },
    ],
    progressHistory: [
      { month: "Mar", planned: 25, actual: 22 },
    ],
  },
  {
    id: "proj-8",
    name: "Data Lake & Analytics Platform",
    status: "em_andamento",
    startDate: "2025-01-20",
    endDate: "2025-08-30",
    description: "Implementação de plataforma de dados unificada com data lake, pipelines ETL e camada analítica self-service.",
    progress: 35,
    category: "Tecnologia",
    milestones: [
      { id: "m29", title: "Arquitetura de dados", completed: true, date: "2025-02-15" },
      { id: "m30", title: "Infraestrutura", completed: true, date: "2025-03-15" },
      { id: "m31", title: "Pipelines ETL", completed: false, date: "2025-05-30" },
      { id: "m32", title: "Camada analítica", completed: false, date: "2025-08-30" },
    ],
    contents: [
      { id: "c18", projectId: "proj-8", type: "dashboard", title: "Volume de Dados Ingeridos", description: "Monitoramento diário", chartType: "area", chartData: [
        { name: "Sem 1", value: 12 }, { name: "Sem 2", value: 28 }, { name: "Sem 3", value: 45 },
        { name: "Sem 4", value: 67 }, { name: "Sem 5", value: 89 }, { name: "Sem 6", value: 112 },
      ]},
      { id: "c19", projectId: "proj-8", type: "pdf", title: "Arquitetura de Referência", description: "Diagrama e documentação técnica" },
    ],
    progressHistory: [
      { month: "Jan", planned: 10, actual: 8 }, { month: "Fev", planned: 22, actual: 20 },
      { month: "Mar", planned: 35, actual: 35 },
    ],
  },
];
