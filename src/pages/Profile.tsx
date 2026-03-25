import { useState } from "react";
import { User, Shield, LogOut, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const user = {
    firstName: "Cliente",
    lastName: "Ibmec",
    email: "cliente@ibmecjr.com.br",
    role: "Cliente Principal",
  };

  return (
    <div className="container max-w-4xl py-8 pb-24 sm:pb-8 px-4 sm:px-6 lg:px-8 mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Configurações de Perfil</h1>
        <p className="text-muted-foreground">
          Gerencie suas informações pessoais e preferências de conta.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className="flex flex-col items-center p-6 bg-card border rounded-xl shadow-sm space-y-4">
            <div className="relative group">
              <div className="h-24 w-24 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-3xl font-semibold shadow-inner overflow-hidden uppercase">
                {user.firstName[0]}{user.lastName[0]}
              </div>
              <button title="Atualizar foto" className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-secondary border-2 border-background flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shadow-sm">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-lg">{user.firstName} {user.lastName}</h3>
              <p className="text-sm text-muted-foreground">{user.role}</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="bg-card border rounded-xl shadow-sm p-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <User className="h-5 w-5 text-muted-foreground" />
                Informações Pessoais
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nome</Label>
                  <Input id="firstName" defaultValue={user.firstName} disabled={!isEditing} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Sobrenome</Label>
                  <Input id="lastName" defaultValue={user.lastName} disabled={!isEditing} />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">E-mail corporativo</Label>
                <Input id="email" type="email" defaultValue={user.email} disabled={!isEditing} />
              </div>
            </div>

            {isEditing ? (
              <div key="editing-buttons" className="pt-4 border-t flex justify-end gap-3 mt-4">
                <Button variant="outline" onClick={() => setIsEditing(false)}>Cancelar</Button>
                <Button onClick={() => setIsEditing(false)}>Salvar Alterações</Button>
              </div>
            ) : (
              <div key="viewing-buttons" className="pt-4 border-t flex justify-end mt-4">
                <Button onClick={() => setIsEditing(true)}>Editar</Button>
              </div>
            )}
          </div>

          <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6">
            <h3 className="text-lg font-medium text-destructive mb-2 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Sessão
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Encerre sua sessão atual no sistema.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Button variant="destructive" className="gap-2">
                <LogOut className="h-4 w-4" />
                Sair da Conta
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
