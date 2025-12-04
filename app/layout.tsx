import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header'
import Footer from './components/Footer'

export const metadata = {
  title: "Recruitment Automation system",
  description: "Campus Placement System",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
         <Header/>
        {children}
        <Footer/>
        </body>
    </html>
  );
}
