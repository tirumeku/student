
'use client';

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { uploadBranding, type BrandingState } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Uploading...' : 'Upload Logo'}
    </Button>
  );
}

export function BrandingForm() {
  const initialState: BrandingState = { message: null, errors: {}, success: false };
  const [state, dispatch] = useActionState(uploadBranding, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form ref={formRef} action={dispatch} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="logo">Application Logo</Label>
        <Input id="logo" name="logo" type="file" accept="image/*" />
        {state.errors?.logo && <p className="text-sm text-destructive">{state.errors.logo[0]}</p>}
      </div>
      
      {state.message && (
        <Alert variant={state.success ? 'default' : 'destructive'}>
          <Terminal className="h-4 w-4" />
          <AlertTitle>{state.success ? 'Success' : 'Error'}</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}

      <SubmitButton />
    </form>
  );
}
