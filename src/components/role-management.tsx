'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Mock data
const roles = [
  {
    name: 'Admin',
    permissions: ['Create Users', 'Edit Users', 'Delete Users', 'View Content'],
  },
  { name: 'Editor', permissions: ['Edit Users', 'View Content'] },
  { name: 'Viewer', permissions: ['View Content'] },
];

const allPermissions = [
  'Create Users',
  'Edit Users',
  'Delete Users',
  'View Content',
];

export function RoleManagement() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Roles</h3>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                {allPermissions.map((permission) => (
                  <TableHead key={permission} className="text-center">
                    {permission}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.name}>
                  <TableCell className="font-medium">{role.name}</TableCell>
                  {allPermissions.map((permission) => (
                    <TableCell key={permission} className="text-center">
                      <Checkbox
                        checked={role.permissions.includes(permission)}
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-4">Create New Role</h3>
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="role-name">Role Name</Label>
            <Input id="role-name" placeholder="e.g., Moderator" />
          </div>
          <div className="grid gap-2">
            <Label>Permissions</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {allPermissions.map((permission) => (
                <div key={permission} className="flex items-center gap-2">
                  <Checkbox id={`perm-${permission}`} />
                  <Label htmlFor={`perm-${permission}`} className="font-normal">
                    {permission}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <Button>Create Role</Button>
        </div>
      </div>
    </div>
  );
}
