import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface NotificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

const mockNotifications = [
  {
    id: 1,
    title: "Documento atualizado",
    description: "O escopo do seu projeto foi atualizado.",
    date: new Date(Date.now() - 1000 * 60 * 2), // 2 minutes ago
    read: false,
  },
  {
    id: 2,
    title: "Nova etapa concluída",
    description: "A equipe finalizou a entrega parcial do seu projeto.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 1), // 1 hour ago
    read: false,
  },
  {
    id: 3,
    title: "Atualização do sistema",
    description: "As novas funcionalidades já estão disponíveis.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1), // 1 day ago
    read: true,
  },
  {
    id: 4,
    title: "Fatura disponível",
    description: "O boleto referente a este mês já está disponível no painel.",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    read: true,
  },
];

export function NotificationModal({ open, onOpenChange, children }: NotificationModalProps) {
  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 shadow-lg rounded-xl dark:border-accent">
        <DropdownMenuLabel className="font-semibold text-base py-3">Notificações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {mockNotifications.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            Sem notificações
          </div>
        ) : (
          <div className="max-h-[300px] overflow-y-auto scrollbar-thin">
            {mockNotifications.map((notif) => (
              <DropdownMenuItem 
                key={notif.id} 
                className="group flex flex-col items-start gap-1 p-3 cursor-pointer hover:bg-primary focus:bg-primary hover:text-primary-foreground focus:text-primary-foreground transition-colors"
              >
                <div className="flex w-full justify-between items-start gap-2">
                  <span className={`text-sm font-medium ${notif.read ? "text-muted-foreground group-hover:text-white/90 group-focus:text-white/90" : "group-hover:text-white group-focus:text-white"}`}>
                    {notif.title}
                  </span>
                  {!notif.read && (
                    <span className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1 group-hover:bg-white group-focus:bg-white" />
                  )}
                </div>
                <span className="text-xs text-muted-foreground line-clamp-2 group-hover:text-white/90 group-focus:text-white/90">
                  {notif.description}
                </span>
                <span className="text-[10px] text-muted-foreground/80 mt-1 group-hover:text-white/80 group-focus:text-white/80">
                  {formatDistanceToNow(notif.date, { addSuffix: true, locale: ptBR })}
                </span>
              </DropdownMenuItem>
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
