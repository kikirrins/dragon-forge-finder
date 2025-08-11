import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Dice6, Users, Star, Shield, Heart } from 'lucide-react';

const Index = () => {
  const { user, loading } = useAuth();

  // Redirect to app if authenticated
  if (user && !loading) {
    return <Navigate to="/app" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin text-primary">
          <Dice6 size={48} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 bg-primary/10 rounded-full">
              <Dice6 className="h-16 w-16 text-primary" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            D&D Connect
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            The ultimate platform to find your perfect D&D party. Connect with players, 
            discover campaigns, and embark on epic adventures together.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link to="/auth">Start Your Adventure</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <Link to="/auth">Join as DM</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose D&D Connect?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Find Your Party</CardTitle>
                <CardDescription>
                  Connect with like-minded players and DMs in your area or online
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Match by experience level</li>
                  <li>• Filter by location and preferences</li>
                  <li>• Browse active campaigns</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader className="text-center">
                <Star className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Player Ratings</CardTitle>
                <CardDescription>
                  Build trust with community ratings and reviews
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Rate roleplay quality</li>
                  <li>• Review reliability</li>
                  <li>• Build your reputation</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Safe & Secure</CardTitle>
                <CardDescription>
                  Play in a welcoming environment with verified players
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Verified user profiles</li>
                  <li>• Community moderation</li>
                  <li>• Report system</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-card/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Profile</h3>
              <p className="text-muted-foreground">
                Set up your character profile with experience level, preferences, and location
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Discover Players</h3>
              <p className="text-muted-foreground">
                Browse through profiles and find players that match your style and schedule
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Start Adventure</h3>
              <p className="text-muted-foreground">
                Connect, plan sessions, and embark on unforgettable D&D adventures
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Roll for Initiative?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of players already forming epic parties
          </p>
          <Button asChild size="lg" className="text-lg px-8">
            <Link to="/auth">
              <Heart className="w-5 h-5 mr-2" />
              Join the Adventure
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
