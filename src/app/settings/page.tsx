import { UserManagement } from '@/components/user-management';
import { RoleManagement } from '@/components/role-management';
import { UserRegistrationForm } from '@/components/user-registration-form';
import { BrandingForm } from '@/components/branding-form';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold font-headline tracking-tight mb-8">
        Settings
      </h1>
      <Tabs defaultValue="user-management">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="user-management">User Management</TabsTrigger>
          <TabsTrigger value="role-management">Role Management</TabsTrigger>
          <TabsTrigger value="user-registration">User Registration</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
        </TabsList>

        <TabsContent value="user-management">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Assign roles to users and manage their access.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UserManagement />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="role-management">
          <Card>
            <CardHeader>
              <CardTitle>Role Management</CardTitle>
              <CardDescription>
                Define roles and their permissions within the application.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RoleManagement />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="user-registration">
          <Card>
            <CardHeader>
              <CardTitle>User Registration</CardTitle>
              <CardDescription>
                Add a new user to the system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UserRegistrationForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="branding">
          <Card>
            <CardHeader>
              <CardTitle>Branding</CardTitle>
              <CardDescription>
                Customize the look and feel of the application.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BrandingForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
