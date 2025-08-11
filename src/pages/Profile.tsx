import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Star, User, MapPin, BookOpen, Shield } from 'lucide-react';

const Profile = () => {
  const { profile, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    display_name: profile?.display_name || '',
    bio: profile?.bio || '',
    preferred_edition: profile?.preferred_edition || '',
    experience_level: profile?.experience_level || '',
    location: profile?.location || '',
    looking_for_group: profile?.looking_for_group || false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(formData);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Loading Profile...</h2>
          <p className="text-muted-foreground">Gathering your character sheet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card className="border-primary/20">
          <CardHeader className="text-center">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24 border-4 border-primary/20">
                <AvatarFallback className="text-2xl bg-primary/10">
                  {profile.display_name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{profile.display_name}</CardTitle>
                <CardDescription className="text-lg">@{profile.username}</CardDescription>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant={profile.looking_for_group ? "default" : "secondary"}>
                  {profile.looking_for_group ? "Looking for Group" : "Not Available"}
                </Badge>
                {profile.experience_level && (
                  <Badge variant="outline" className="capitalize">
                    <Shield className="w-3 h-3 mr-1" />
                    {profile.experience_level}
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Profile Details */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Character Info */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Character Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="display_name">Display Name</Label>
                    <Input
                      id="display_name"
                      value={formData.display_name}
                      onChange={(e) => handleInputChange('display_name', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      placeholder="Tell others about your D&D journey..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="preferred_edition">Preferred Edition</Label>
                    <Select 
                      value={formData.preferred_edition} 
                      onValueChange={(value) => handleInputChange('preferred_edition', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select edition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5e">D&D 5th Edition</SelectItem>
                        <SelectItem value="pathfinder2e">Pathfinder 2e</SelectItem>
                        <SelectItem value="3.5e">D&D 3.5e</SelectItem>
                        <SelectItem value="4e">D&D 4th Edition</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience_level">Experience Level</Label>
                    <Select 
                      value={formData.experience_level} 
                      onValueChange={(value) => handleInputChange('experience_level', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="master">Master DM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="City, State/Country"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="looking_for_group"
                      checked={formData.looking_for_group}
                      onCheckedChange={(checked) => handleInputChange('looking_for_group', checked)}
                    />
                    <Label htmlFor="looking_for_group">Looking for group</Label>
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit">Save Changes</Button>
                    <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  {profile.bio && (
                    <div>
                      <h4 className="font-medium mb-1">Bio</h4>
                      <p className="text-muted-foreground">{profile.bio}</p>
                    </div>
                  )}
                  
                  {profile.preferred_edition && (
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-primary" />
                      <span className="font-medium">Preferred Edition:</span>
                      <span>{profile.preferred_edition}</span>
                    </div>
                  )}
                  
                  {profile.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="font-medium">Location:</span>
                      <span>{profile.location}</span>
                    </div>
                  )}

                  <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Ratings & Reviews */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                Player Rating
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-primary">4.8</div>
                <div className="flex items-center justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= 5 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground">Based on 12 reviews</p>
              </div>
              
              <div className="mt-6 space-y-3">
                <div className="text-sm">
                  <div className="flex justify-between items-center mb-1">
                    <span>Roleplay</span>
                    <span>5/5</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                
                <div className="text-sm">
                  <div className="flex justify-between items-center mb-1">
                    <span>Reliability</span>
                    <span>4.5/5</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                
                <div className="text-sm">
                  <div className="flex justify-between items-center mb-1">
                    <span>Teamwork</span>
                    <span>4.8/5</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '96%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;