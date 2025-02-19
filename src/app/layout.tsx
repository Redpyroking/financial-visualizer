import Link from 'next/link';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Personal Finance Visualizer</title>
      </head>
      <body className="antialiased">
        <nav className="navbar">
          <div className="flex items-center space-x-4">
            <Link href="/">Dashboard</Link>
            <Link href="/transactions">Transactions</Link>
            <Link href="/budgets">Budgets</Link>
          </div>
        </nav>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
