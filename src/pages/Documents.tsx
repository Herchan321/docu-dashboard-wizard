
import { useState } from "react";
import { 
  FileText, 
  Upload, 
  Download, 
  Trash2, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  FilePlus2 
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

// Mock data for documents
const documentsData = [
  {
    id: 1,
    title: "Rapport financier Q1 2023",
    type: "PDF",
    size: "2.4 MB",
    createdBy: "Thomas Dubois",
    lastModified: "23 Nov 2023",
    status: "approved"
  },
  {
    id: 2,
    title: "Contrat client #45982",
    type: "DOCX",
    size: "1.8 MB",
    createdBy: "Sophie Martin",
    lastModified: "22 Nov 2023",
    status: "draft"
  },
  {
    id: 3,
    title: "Présentation marketing 2023",
    type: "PPTX",
    size: "4.2 MB",
    createdBy: "Marc Bernard",
    lastModified: "21 Nov 2023",
    status: "approved"
  },
  {
    id: 4,
    title: "Brouillon - Projet Alpha",
    type: "DOCX",
    size: "0.8 MB",
    createdBy: "Julie Leroux",
    lastModified: "20 Nov 2023",
    status: "draft"
  },
  {
    id: 5,
    title: "Plan stratégique 2024",
    type: "PDF",
    size: "3.1 MB",
    createdBy: "Éric Dupont",
    lastModified: "19 Nov 2023",
    status: "review"
  },
  {
    id: 6,
    title: "Données analytiques Q3",
    type: "XLSX",
    size: "5.7 MB",
    createdBy: "Anne Moreau",
    lastModified: "18 Nov 2023",
    status: "approved"
  },
  {
    id: 7,
    title: "Guide utilisateur v2.1",
    type: "PDF",
    size: "2.9 MB",
    createdBy: "Philippe Lambert",
    lastModified: "17 Nov 2023",
    status: "approved"
  }
];

interface Document {
  id: number;
  title: string;
  type: string;
  size: string;
  createdBy: string;
  lastModified: string;
  status: string;
}

const Documents = () => {
  const [documents, setDocuments] = useState<Document[]>(documentsData);

  const handleDocumentAction = (action: string, documentId: number, documentTitle: string) => {
    switch (action) {
      case 'view':
        toast.info(`Visualisation de "${documentTitle}"`);
        break;
      case 'download':
        toast.success(`Téléchargement de "${documentTitle}" en cours...`);
        break;
      case 'delete':
        setDocuments(documents.filter(doc => doc.id !== documentId));
        toast.success(`Document "${documentTitle}" supprimé`);
        break;
      case 'edit':
        toast.info(`Édition de "${documentTitle}"`);
        break;
      default:
        break;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500">Approuvé</Badge>;
      case 'review':
        return <Badge className="bg-yellow-500">En revue</Badge>;
      case 'draft':
        return <Badge variant="outline">Brouillon</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const columns = [
    { 
      header: "Titre", 
      accessorKey: "title" as keyof Document,
      cell: (document: Document) => (
        <div className="flex items-center">
          <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
          {document.title}
        </div>
      )
    },
    { 
      header: "Type", 
      accessorKey: "type" as keyof Document
    },
    { 
      header: "Taille", 
      accessorKey: "size" as keyof Document
    },
    { 
      header: "Créé par", 
      accessorKey: "createdBy" as keyof Document
    },
    { 
      header: "Dernière modification", 
      accessorKey: "lastModified" as keyof Document
    },
    { 
      header: "Statut", 
      accessorKey: "status" as keyof Document,
      cell: (document: Document) => getStatusBadge(document.status)
    },
    {
      header: "Actions",
      accessorKey: "id" as keyof Document,
      cell: (document: Document) => (
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => handleDocumentAction('view', document.id, document.title)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => handleDocumentAction('download', document.id, document.title)}
          >
            <Download className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem 
                onClick={() => handleDocumentAction('edit', document.id, document.title)}
              >
                <Edit className="mr-2 h-4 w-4" /> Éditer
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleDocumentAction('delete', document.id, document.title)}
                className="text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" /> Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Documents</h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Importer
            </Button>
            <Button>
              <FilePlus2 className="mr-2 h-4 w-4" />
              Nouveau document
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <DataTable 
            data={documents} 
            columns={columns}
            title="Liste des documents"
            searchKey="title"
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Documents;
