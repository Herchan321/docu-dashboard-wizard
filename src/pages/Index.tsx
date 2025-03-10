import { FileText, Users, Clock, Eye } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import DataTable from "@/components/dashboard/DataTable";

// Mock data for recent activities
const recentActivities = [
  { 
    user: "Thomas Dubois", 
    action: "Modification", 
    document: "Rapport financier Q1 2023",
    timestamp: "Il y a 5 minutes"
  },
  { 
    user: "Sophie Martin", 
    action: "Téléchargement", 
    document: "Contrat client #45982",
    timestamp: "Il y a 15 minutes"
  },
  { 
    user: "Marc Bernard", 
    action: "Upload", 
    document: "Présentation marketing 2023",
    timestamp: "Il y a 40 minutes" 
  },
  { 
    user: "Julie Leroux", 
    action: "Suppression", 
    document: "Brouillon - Projet Alpha",
    timestamp: "Il y a 1 heure" 
  },
  { 
    user: "Éric Dupont", 
    action: "Création", 
    document: "Plan stratégique 2024",
    timestamp: "Il y a 2 heures" 
  }
];

// Define the type for our activities to ensure type safety
type Activity = {
  user: string;
  action: string;
  document: string;
  timestamp: string;
};

// Table columns configuration - fixing the typing issue
const activityColumns = [
  { header: "Utilisateur", accessorKey: "user" as keyof Activity },
  { header: "Action", accessorKey: "action" as keyof Activity },
  { header: "Document", accessorKey: "document" as keyof Activity },
  { header: "Horodatage", accessorKey: "timestamp" as keyof Activity },
];

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Documents" 
            value="1,284" 
            icon={FileText}
            trend={{ value: 12, isPositive: true }}
            description="Tous les documents"
          />
          <StatCard 
            title="Utilisateurs" 
            value="347" 
            icon={Users}
            trend={{ value: 8, isPositive: true }}
            description="Utilisateurs actifs"
          />
          <StatCard 
            title="Activité récente" 
            value="254" 
            icon={Clock}
            description="Documents modifiés cette semaine"
          />
          <StatCard 
            title="Vues document" 
            value="2,842" 
            icon={Eye}
            trend={{ value: 3, isPositive: false }}
            description="Consultations cette semaine"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-3">
            <DataTable 
              data={recentActivities} 
              columns={activityColumns}
              title="Activités récentes"
              searchKey="document"
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
