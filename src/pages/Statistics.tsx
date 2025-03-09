
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for document by type
const documentsByType = [
  { type: "PDF", count: 45 },
  { type: "DOCX", count: 32 },
  { type: "XLSX", count: 18 },
  { type: "PPTX", count: 15 },
  { type: "TXT", count: 8 },
  { type: "Autres", count: 12 },
];

// Mock data for documents by month
const documentsByMonth = [
  { month: "Jan", nouveaux: 25, modifiés: 18, supprimés: 3 },
  { month: "Fév", nouveaux: 32, modifiés: 22, supprimés: 5 },
  { month: "Mar", nouveaux: 28, modifiés: 25, supprimés: 4 },
  { month: "Avr", nouveaux: 35, modifiés: 30, supprimés: 6 },
  { month: "Mai", nouveaux: 40, modifiés: 32, supprimés: 7 },
  { month: "Juin", nouveaux: 38, modifiés: 35, supprimés: 5 },
  { month: "Juil", nouveaux: 42, modifiés: 33, supprimés: 4 },
  { month: "Août", nouveaux: 30, modifiés: 28, supprimés: 6 },
  { month: "Sep", nouveaux: 36, modifiés: 30, supprimés: 8 },
  { month: "Oct", nouveaux: 45, modifiés: 36, supprimés: 9 },
  { month: "Nov", nouveaux: 48, modifiés: 40, supprimés: 7 },
  { month: "Déc", nouveaux: 50, modifiés: 42, supprimés: 8 },
];

// Mock data for active users
const activeUsers = [
  { jour: "Lun", utilisateurs: 42 },
  { jour: "Mar", utilisateurs: 45 },
  { jour: "Mer", utilisateurs: 50 },
  { jour: "Jeu", utilisateurs: 48 },
  { jour: "Ven", utilisateurs: 52 },
  { jour: "Sam", utilisateurs: 25 },
  { jour: "Dim", utilisateurs: 22 },
];

// Colors for pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const Statistics = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Statistiques</h1>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Documents par mois</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={documentsByMonth}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="nouveaux" fill="#3B82F6" name="Nouveaux" />
                        <Bar dataKey="modifiés" fill="#10B981" name="Modifiés" />
                        <Bar dataKey="supprimés" fill="#EF4444" name="Supprimés" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Documents par type</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={documentsByType}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="count"
                          nameKey="type"
                        >
                          {documentsByType.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value, name, props) => [`${value} documents`, props.payload.type]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Utilisateurs actifs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={activeUsers}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="jour" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="utilisateurs" stroke="#3B82F6" activeDot={{ r: 8 }} name="Utilisateurs actifs" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="documents" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Activité des documents par mois</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={documentsByMonth}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="nouveaux" fill="#3B82F6" name="Nouveaux" />
                        <Bar dataKey="modifiés" fill="#10B981" name="Modifiés" />
                        <Bar dataKey="supprimés" fill="#EF4444" name="Supprimés" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Documents par type</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={documentsByType}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="count"
                          nameKey="type"
                        >
                          {documentsByType.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value, name, props) => [`${value} documents`, props.payload.type]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Tendance mensuelle</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={documentsByMonth}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="nouveaux" stroke="#3B82F6" name="Nouveaux" />
                        <Line type="monotone" dataKey="modifiés" stroke="#10B981" name="Modifiés" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Utilisateurs actifs par jour</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={activeUsers}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="jour" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="utilisateurs" stroke="#3B82F6" activeDot={{ r: 8 }} name="Utilisateurs actifs" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Statistics;
