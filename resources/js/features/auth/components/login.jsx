import React from "react";
import { useForm, Head } from "@inertiajs/react";
import { RequireGuest } from "../../../configs";
import { InputField, PasswordField } from "../../../components";
import { AudioLines, LogIn, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";

function LoginPage() {
    const { data, setData, post, processing, errors, setError } = useForm({
        name: "",
        password: "",
        remember: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/login");
    };

    return (
        <RequireGuest>
            <Head title="MuSync - Login" />
            <div className="min-h-screen flex items-center justify-center bg-background p-4">
                <div className="w-full max-w-5xl bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="hidden md:block bg-gradient-to-br from-primary/80 via-primary to-primary/90 relative overflow-hidden">
                            <img
                                src="/assets/images/login.png"
                                alt="Login Illustration"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 "></div>
                        </div>

                        <div className="p-8 md:p-12 flex flex-col justify-center">
                            <div className="mb-8">
                                <div className="flex items-center gap-2 mb-6 justify-center">
                                    <div className="p-2 rounded-lg bg-primary/10">
                                        <AudioLines className="w-6 h-6 text-primary" />
                                    </div>
                                    <span className="text-xl font-bold text-primary">
                                        MuSync
                                    </span>
                                </div>
                                <h1 className="text-3xl font-bold text-foreground mb-2 text-center">
                                    Welcome Back
                                </h1>
                                <p className="text-muted-foreground text-sm text-center">
                                    Hey, welcome back to your special place
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <InputField
                                    label="Username"
                                    name="name"
                                    type="text"
                                    placeholder="Enter your username"
                                    value={data.name}
                                    onChange={(e) => {
                                        setData("name", e.target.value);
                                        setError("name", null);
                                    }}
                                    required
                                    error={errors.name}
                                />

                                <PasswordField
                                    label="Password"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={data.password}
                                    onChange={(e) => {
                                        setData("password", e.target.value);
                                        setError("password", null);
                                    }}
                                    required
                                    error={errors.password}
                                />

                                <div className="flex items-center justify-between">
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={data.remember}
                                            onChange={(e) =>
                                                setData(
                                                    "remember",
                                                    e.target.checked
                                                )
                                            }
                                            className="sr-only"
                                        />
                                        <div
                                            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                                                data.remember
                                                    ? "bg-primary border-primary"
                                                    : "border-border group-hover:border-primary/50"
                                            }`}
                                        >
                                            {data.remember && (
                                                <Check className="w-3 h-3 text-primary-foreground" />
                                            )}
                                        </div>
                                        <span className="text-sm text-foreground select-none">
                                            Remember me
                                        </span>
                                    </label>
                                    <a
                                        href="#"
                                        className="text-sm text-primary hover:text-primary/80 transition-colors"
                                    >
                                        Forgot Password?
                                    </a>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-6 text-base font-semibold rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200"
                                >
                                    {processing ? (
                                        <>
                                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                            Signing in...
                                        </>
                                    ) : (
                                        <>
                                            <LogIn className="w-5 h-5 mr-2" />
                                            Sign In
                                        </>
                                    )}
                                </Button>
                            </form>

                            <p className="text-center text-sm text-muted-foreground mt-6">
                                Don&apos;t have an account?
                                <a
                                    href="#"
                                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                                >
                                    Sign up
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster position="top-right" richColors />
        </RequireGuest>
    );
}

export default LoginPage;
