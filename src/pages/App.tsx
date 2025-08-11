import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { Heart, X, Star, MapPin, Shield, Users, Calendar, Dice6, User } from 'lucide-react';

// Mock data for players
const mockPlayers = [
  {
    id: '1',
    display_name: 'Elena Shadowweaver',
    username: 'shadowmage',
    bio: 'Experienced DM with 8+ years of storytelling. Love creating immersive worlds and memorable NPCs.',
    preferred_edition: 'D&D 5th Edition',
    experience_level: 'master',
    location: 'San Francisco, CA',
    rating: 4.9,
    reviews: 27,
    looking_for_group: true,
    tags: ['DM', 'Storyteller', 'Campaign Creator']
  },
  {
    id: '2',
    display_name: 'Marcus Ironforge',
    username: 'dwarfpaladin',
    bio: 'Roleplay enthusiast who always brings snacks! Looking for a long-term campaign.',
    preferred_edition: 'D&D 5th Edition',
    experience_level: 'intermediate',
    location: 'Austin, TX',
    rating: 4.7,
    reviews: 15,
    looking_for_group: true,
    tags: ['Roleplay', 'Team Player', 'Reliable']
  },
  {
    id: '3',
    display_name: 'Zara Nightwhisper',
    username: 'roguemaster',
    bio: 'New to D&D but eager to learn! Love problem-solving and character development.',
    preferred_edition: 'D&D 5th Edition',
    experience_level: 'beginner',
    location: 'Chicago, IL',
    rating: 4.8,
    reviews: 8,
    looking_for_group: true,
    tags: ['New Player', 'Enthusiastic', 'Quick Learner']
  }
];

const PlayerCard = ({ player }: { player: any }) => {
  return (
    <Card className="w-full max-w-md mx-auto border-2 border-primary/20 hover:border-primary/40 transition-colors">
      <CardHeader className="text-center">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-20 w-20 border-4 border-primary/20">
            <AvatarFallback className="text-xl bg-primary/10">
              {player.display_name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl">{player.display_name}</CardTitle>
            <CardDescription>@{player.username}</CardDescription>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="font-medium">{player.rating}</span>
            <span className="text-muted-foreground">({player.reviews} reviews)</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-center text-muted-foreground">{player.bio}</p>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Shield className="w-4 h-4 text-primary" />
            <span className="capitalize">{player.experience_level}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{player.location}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {player.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex gap-2 mt-6">
          <Button variant="outline" size="sm" className="flex-1">
            <X className="w-4 h-4 mr-2" />
            Pass
          </Button>
          <Button size="sm" className="flex-1">
            <Heart className="w-4 h-4 mr-2" />
            Connect
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const App = () => {
  const { user, profile, signOut, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin text-primary">
          <Dice6 size={48} />
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Dice6 className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold">D&D Connect</h1>
            </div>
            
            <nav className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Users className="w-4 h-4 mr-2" />
                Discover
              </Button>
              <Button variant="ghost" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Sessions
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/profile">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={signOut}>
                Sign Out
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Find Your Party</h2>
          <p className="text-muted-foreground">
            Discover amazing players and DMs in your area
          </p>
        </div>

        {/* Player Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {mockPlayers.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="text-center border-primary/20">
            <CardHeader>
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <CardTitle>Join a Campaign</CardTitle>
              <CardDescription>Find ongoing campaigns looking for players</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">Browse Campaigns</Button>
            </CardContent>
          </Card>

          <Card className="text-center border-primary/20">
            <CardHeader>
              <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
              <CardTitle>One-Shot Adventures</CardTitle>
              <CardDescription>Quick games for busy schedules</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">Find One-Shots</Button>
            </CardContent>
          </Card>

          <Card className="text-center border-primary/20">
            <CardHeader>
              <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
              <CardTitle>DM Resources</CardTitle>
              <CardDescription>Tools and tips for Dungeon Masters</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">DM Corner</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default App;