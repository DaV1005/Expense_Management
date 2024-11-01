import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, PieChart, Wallet, TrendingUp, Shield } from 'lucide-react'
import { useNavigate } from 'react-router-dom';


const HomePage = () => {

const navigate = useNavigate();

const onClick = () =>{
    navigate('/signup');
}

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <div className="flex items-center justify-center">
          <Wallet className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-bold">Free Expense Tracker</span>
        </div>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <a className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </a>
          <a className="text-sm font-medium hover:underline underline-offset-4" href="#about">
            About
          </a>
          <a className="text-sm font-medium hover:underline underline-offset-4" href="/login">
            Login
          </a>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Manage Your Expenses for Free
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Take control of your finances without spending a dime. Track, analyze, and optimize your spending with our intuitive and completely free expense management tool.
                </p>
              </div>
              <div className="space-x-4">
                <Button onClick={onClick} className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                  Get Started for Free
                </Button>
                <Button variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Key Features</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader>
                  <PieChart className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Free Expense Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Easily log and categorize your expenses without any cost.</CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <TrendingUp className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Insightful Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Gain valuable insights with detailed reports and spending trends analysis, all for free.</CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Shield className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Secure & Private</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Your financial data is encrypted and protected at no cost to you.</CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Wallet className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Budget Planning</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>Set budgets for different categories and track your progress towards financial goals, completely free.</CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">About Our Free Tool</h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  We believe that financial management should be accessible to everyone. That's why we've created this powerful expense tracking tool and made it completely free. No hidden fees, no premium features - just a comprehensive solution to help you take control of your finances.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Start Managing Your Expenses Today</h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Join thousands of users who have taken control of their finances with our free expense management tool. Sign up now and start your journey to financial freedom!
                </p>
              </div>
              <Button onClick={onClick} className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-8 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                Sign Up for Free
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Free Expense Tracker. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </a>
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Privacy Policy
          </a>
        </nav>
      </footer>
    </div>
  )
}

export default HomePage