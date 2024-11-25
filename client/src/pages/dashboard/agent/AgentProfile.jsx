import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  CalendarIcon,
  Camera,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";

export default function AgentProfile() {
  const [profile, setProfile] = useState({
    firstName: "Oliver",
    lastName: "Ethan",
    email: "",
    phone: "",
    birthday: new Date("1991-12-12"),
    gender: "Male",
    bio: "Experienced property manager with a passion for providing excellent accommodation to students.",
    avatar: "/placeholder-avatar.jpg",
    facebook: "",
    instagram: "",
    linkedin: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setProfile((prev) => ({ ...prev, birthday: date }));
  };

  const handleGenderChange = (value) => {
    setProfile((prev) => ({ ...prev, gender: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle profile update logic here
    console.log("Updated profile:", profile);
    // You would typically send this data to your API
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Your Profile</h2>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Update your profile information here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-24 h-24">
                <AvatarImage
                  src={profile.avatar}
                  alt={`${profile.firstName} ${profile.lastName}`}
                />
                <AvatarFallback>
                  {profile.firstName[0]}
                  {profile.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <Label htmlFor="avatar" className="cursor-pointer">
                  <div className="flex items-center space-x-2">
                    <Camera className="w-4 h-4" />
                    <span>Change avatar</span>
                  </div>
                </Label>
                <Input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={profile.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label>Birthday</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={`w-full justify-start text-left font-normal ${
                        !profile.birthday && "text-muted-foreground"
                      }`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {profile.birthday ? (
                        format(profile.birthday, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={profile.birthday}
                      onSelect={handleDateChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>Gender</Label>
                <RadioGroup
                  defaultValue={profile.gender}
                  onValueChange={handleGenderChange}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={profile.bio}
                onChange={handleInputChange}
                rows={4}
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Social Links</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Facebook className="w-5 h-5" />
                  <Input
                    name="facebook"
                    placeholder="Facebook URL"
                    value={profile.facebook}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Instagram className="w-5 h-5" />
                  <Input
                    name="instagram"
                    placeholder="Instagram URL"
                    value={profile.instagram}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Linkedin className="w-5 h-5" />
                  <Input
                    name="linkedin"
                    placeholder="LinkedIn URL"
                    value={profile.linkedin}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button type="submit">Save Changes</Button>
              <Button variant="outline">Change Password</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
