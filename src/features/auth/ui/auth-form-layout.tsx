import React from "react"

export function AuthFormLayout({}: {
    title: string;
    description: string;
    inputs: React.ReactNode;
    actions: React.ReactNode;
    link: React.ReactNode;
}) {
    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                    Sign up
                </CardTitle>
                <CardDescription className="text-center">
                    Create your account to get started
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input  
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input  
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <Button type="submit" className="w-full">
                        Sign Up
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="flex justify-center">
                <p className="text-sm text-primary/50">
                    Already have an account?{" "}
                    <Link 
                        href="/sign-in"
                        className="font-medium text-primary hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
            </CardFooter>
        </Card>
    )
}