
import { useState } from "react";
import { 
  CheckCircle2, 
  XCircle, 
  MoreHorizontal, 
  UserPlus,
  Mail
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import DataTable from "@/components/dashboard/DataTable";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { toast } from "sonner";

// Mock data for users
const usersData = [
  {
    id: 1,
    name: "Thomas Dubois",
    email: "thomas.dubois@example.com",
    role: "Admin",
    status: "active",
    lastLogin: "23 Nov 2023"
  },
  {
    id: 2,
    name: "Sophie Martin",
    email: "sophie.martin@example.com",
    role: "Editor",
    status: "active",
    lastLogin: "22 Nov 2023"
  },
  {
    id: 3,
    name: "Marc Bernard",
    email: "marc.bernard@example.com",
    role: "Viewer",
    status: "inactive",
    lastLogin: "15 Nov 2023"
  },
  {
    id: 4,
    name: "Julie Leroux",
    email: "julie.leroux@example.com",
    role: "Editor",
    status: "active",
    lastLogin: "21 Nov 2023"
  },
  {
    id: 5,
    name: "Éric Dupont",
    email: "eric.dupont@example.com",
    role: "Viewer",
    status: "inactive",
    lastLogin: "10 Nov 2023"
  },
  {
    id: 6,
    name: "Anne Moreau",
    email: "anne.moreau@example.com",
    role: "Admin",
    status: "active",
    lastLogin: "22 Nov 2023"
  },
  {
    id: 7,
    name: "Philippe Lambert",
    email: "p.lambert@example.com",
    role: "Editor",
    status: "active",
    lastLogin: "20 Nov 2023"
  }
];

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>(usersData);

  const toggleUserStatus = (userId: number) => {
    setUsers(users.map(user => {
      if (user.id === userId) {
        const newStatus = user.status === 'active' ? 'inactive' : 'active';
        toast.success(`Statut de l'utilisateur mis à jour: ${newStatus}`);
        return { ...user, status: newStatus };
      }
      return user;
    }));
  };

  const sendInvitation = (email: string) => {
    toast.success(`Invitation envoyée à ${email}`);
  };

  const columns = [
    { 
      header: "Nom", 
      accessorKey: "name" as keyof User
    },
    { 
      header: "Email", 
      accessorKey: "email" as keyof User
    },
    { 
      header: "Rôle", 
      accessorKey: "role" as keyof User,
      cell: (user: User) => {
        const getBadgeVariant = (role: string) => {
          switch (role) {
            case 'Admin': return 'default';
            case 'Editor': return 'secondary';
            default: return 'outline';
          }
        };
        return (
          <Badge variant={getBadgeVariant(user.role)}>{user.role}</Badge>
        );
      }
    },
    { 
      header: "Statut", 
      accessorKey: "status" as keyof User,
      cell: (user: User) => (
        <div className="flex items-center">
          {user.status === 'active' ? (
            <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
          ) : (
            <XCircle className="mr-2 h-4 w-4 text-red-500" />
          )}
          {user.status === 'active' ? 'Actif' : 'Inactif'}
        </div>
      )
    },
    { 
      header: "Dernière connexion", 
      accessorKey: "lastLogin" as keyof User
    },
    {
      header: "Actions",
      accessorKey: "id" as keyof User,
      cell: (user: User) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => toggleUserStatus(user.id)}>
              {user.status === 'active' ? 'Désactiver' : 'Activer'}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => sendInvitation(user.email)}>
              Envoyer une invitation
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Utilisateurs</h1>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Nouvel utilisateur
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-3">
            <DataTable 
              data={users} 
              columns={columns}
              title="Liste des utilisateurs"
              searchKey="name"
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Users;
