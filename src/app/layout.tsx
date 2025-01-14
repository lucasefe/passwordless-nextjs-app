import { UserProvider } from '@auth0/nextjs-auth0/client';
import { AuthProvider } from '@/components/AuthContext';


export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <UserProvider>
      <body>
      <AuthProvider>{children}</AuthProvider>
      </body>
    </UserProvider>
    </html>
  );
}
