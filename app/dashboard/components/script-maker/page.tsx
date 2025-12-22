"use client";

import React, { useState, useRef } from "react";
import { 
  Sparkles, 
  Copy, 
  RefreshCw, 
  Video, 
  Linkedin, 
  Twitter, 
  MonitorPlay 
} from "lucide-react";

// Assuming you have these Shadcn components installed
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

export default function ScriptMakerPage() {
  // State for form inputs
  const [loading, setLoading] = useState(false);
  const [script, setScript] = useState(""); 
  
  // Ref to scroll to results on mobile after generating
  const resultRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    topic: "",
    platform: "youtube",
    genre: "educational",
    targetAudience: "",
    tone: "professional",
    duration: "",
    additionalInfo: "",
  });

  // Function to handle generation
  const handleGenerate = async () => {
    if (!formData.topic) {
      alert("Please enter a topic or core idea.");
      return;
    }

    setLoading(true);
    setScript(""); // Clear previous output

    try {
      const response = await fetch("/api/generate-script", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to generate script");
      }

      const result = await response.json();
      
      if (result.data) {
        setScript(result.data);
      } else if (result.script) {
        setScript(result.script);
      }
      
      // On mobile, scroll down to the result after generation
      if (window.innerWidth < 1024 && resultRef.current) {
        setTimeout(() => {
            resultRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }

    } catch (error) {
      console.error("Error generating script", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // MAIN CONTAINER: 
    // Mobile: Auto height, scrollable body. 
    // Desktop (lg): Fixed screen height, hidden body scroll.
    <div className="flex flex-col lg:flex-row w-full bg-white text-slate-900 font-sans selection:bg-indigo-100 min-h-screen lg:h-screen lg:overflow-hidden">
      
      {/* ---------------------------------------------------------------------------
          LEFT PANEL: INPUTS
          Mobile: Full width, stacks on top.
          Desktop: Fixed 450px width, sits on left.
      --------------------------------------------------------------------------- */}
      <div className="w-full lg:w-[450px] flex flex-col border-b lg:border-b-0 lg:border-r border-slate-200 bg-white shadow-sm z-10 h-auto lg:h-full">
        
        {/* Header Section */}
        <div className="p-6 pb-4 border-b border-slate-100">
           <h1 className="text-xl font-bold text-slate-900">ScriptGen AI</h1>
           <p className="text-slate-500 text-sm mt-1">
             Fill in the details to generate viral content.
           </p>
        </div>

        {/* Scrollable Form Area */}
        {/* Mobile: Natural height. Desktop: Overflow auto */}
        <div className="flex-1 p-6 space-y-5 lg:overflow-y-auto custom-scrollbar">
          
          {/* TOPIC */}
          <div className="space-y-2">
            <Label htmlFor="topic" className="text-slate-700 font-medium">Topic / Core Idea</Label>
            <Textarea 
              id="topic" 
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              placeholder="e.g. How to be productive..." 
              className="resize-none h-24 bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* PLATFORM */}
            <div className="space-y-2">
              <Label className="text-slate-700">Platform</Label>
              <Select 
                value={formData.platform}
                onValueChange={(val) => setFormData({ ...formData, platform: val})}
              >
                <SelectTrigger className="bg-slate-50 border-slate-200">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="linkedin"><div className="flex items-center gap-2"><Linkedin className="w-3 h-3"/> LinkedIn</div></SelectItem>
                  <SelectItem value="twitter"><div className="flex items-center gap-2"><Twitter className="w-3 h-3"/> Twitter/X</div></SelectItem>
                  <SelectItem value="youtube"><div className="flex items-center gap-2"><MonitorPlay className="w-3 h-3"/> YouTube</div></SelectItem>
                  <SelectItem value="shorts"><div className="flex items-center gap-2"><Video className="w-3 h-3"/> Shorts/Reels</div></SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* GENRE */}
            <div className="space-y-2">
              <Label className="text-slate-700">Genre</Label>
              <Select 
                value={formData.genre}
                onValueChange={(val) => setFormData({ ...formData, genre: val})}
              >
                <SelectTrigger className="bg-slate-50 border-slate-200">
                  <SelectValue placeholder="Select genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="educational">Educational</SelectItem>
                  <SelectItem value="storytelling">Storytelling</SelectItem>
                  <SelectItem value="rant">Rant / Opinion</SelectItem>
                  <SelectItem value="case-study">Case Study</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* AUDIENCE & TONE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-700">Target Audience</Label>
              <Input 
                placeholder="e.g. Junior Devs" 
                className="bg-slate-50 border-slate-200"
                value={formData.targetAudience}
                onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-700">Tone</Label>
              <Select 
                value={formData.tone}
                onValueChange={(val) => setFormData({ ...formData, tone: val})}
              >
                <SelectTrigger className="bg-slate-50 border-slate-200">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="witty">Witty / Fun</SelectItem>
                  <SelectItem value="serious">Serious</SelectItem>
                  <SelectItem value="empathetic">Empathetic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* DURATION */}
          <div className="space-y-2">
            <Label className="text-slate-700">Duration / Length</Label>
            <Input 
              placeholder="e.g. Under 60 seconds" 
              className="bg-slate-50 border-slate-200"
              value={formData.duration}
              onChange={(e) => setFormData({...formData, duration: e.target.value})}
            />
          </div>

          {/* ADDITIONAL INFO */}
          <div className="space-y-2">
            <Label className="text-slate-700">Additional Context</Label>
            <Input 
              placeholder="e.g. CTA: Subscribe to my newsletter" 
              className="bg-slate-50 border-slate-200"
              value={formData.additionalInfo}
              onChange={(e) => setFormData({...formData, additionalInfo: e.target.value})}
            />
          </div>
        </div>

        {/* Footer with Action Button */}
        <div className="p-6 pt-4 border-t border-slate-100 bg-white sticky bottom-0 lg:static z-20">
          <Button 
            onClick={handleGenerate}
            disabled={loading}
            className="w-full h-12 text-base font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all"
          >
            {loading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Writing Magic...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" /> Create Script
              </>
            )}
          </Button>
        </div>
      </div>

      {/* ---------------------------------------------------------------------------
          RIGHT PANEL: OUTPUT
      --------------------------------------------------------------------------- */} 
      <div 
        ref={resultRef}
        className="flex-1 p-4 lg:p-8 bg-slate-50 lg:bg-white lg:overflow-y-auto custom-scrollbar min-h-[50vh]"
      >
        <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Generated Script</h2>
                {script && (
                    <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(script)}>
                        <Copy className="w-4 h-4 mr-2"/> Copy
                    </Button>
                )}
            </div>
            
            <Card className="p-6 lg:p-8 bg-white border border-slate-200 shadow-sm min-h-[300px]">
            {script ? (
                <pre className="whitespace-pre-wrap text-slate-900 font-sans text-sm lg:text-base leading-relaxed">
                    {script}
                </pre>
            ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 mt-20">
                    <Sparkles className="w-12 h-12 mb-4 opacity-20" />
                    <p>Your generated script will appear here...</p>
                </div>
            )}
            </Card>
        </div>
      </div>
    </div>
  );
}