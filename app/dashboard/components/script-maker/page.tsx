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
import { toast } from "sonner";

export default function ScriptMakerPage() {
  const [loading, setLoading] = useState(false);
  const [script, setScript] = useState(""); 
  
  const resultRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    topic: "",
    platform: "linkedin",
    genre: "educational",
    targetAudience: "",
    tone: "professional",
    duration: "short",
    additionalInfo: "",
  });

  const copyContent = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast.success("Script copied to clipboard!");
  };

  const handleGenerate = async () => {
    if (!formData.topic) {
      alert("Please enter a topic or core idea.");
      return;
    }

    setLoading(true);
    setScript(""); 

    try {
      const response = await fetch("/api/generate-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to generate script");

      const result = await response.json();
      
      if (result.data) {
        setScript(result.data);
      } else if (result.script) {
        setScript(result.script);
      }
      
      if (window.innerWidth < 1024 && resultRef.current) {
        setTimeout(() => {
            resultRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }

    } catch (error) {
      console.error("Error generating script", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      toast.success("Script generated successfully!");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full bg-white text-slate-900 font-sans selection:bg-yellow-100">
      
      {/* ---------------------------------------------------------------------------
          LEFT PANEL: INPUTS
      --------------------------------------------------------------------------- */}
      <div className="border-r">
        {/* Form Area - Compacted Spacing (p-4 and space-y-3) */}
        <div className="flex-1 p-4 space-y-3 lg:overflow-y-auto ">
          {/* TOPIC */}
          <div className="space-y-1.5">
            <Label htmlFor="topic" className="text-slate-700 font-medium text-sm">Topic / Core Idea</Label>
            <Textarea 
              id="topic" 
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              placeholder="e.g. How to be productive..." 
              // Reduced height to h-20
              className="resize-none h-20 max-w-[400px] h-[120px] bg-slate-50 border-slate-200 focus:border-slate-800"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* PLATFORM */}
            <div className="space-y-1.5">
              <Label className="text-slate-700 text-sm">Platform</Label>
              <Select 
                value={formData.platform}
                onValueChange={(val) => setFormData({ ...formData, platform: val})}
              >
                <SelectTrigger className="bg-slate-50 border-slate-200">
                  <SelectValue placeholder="Select" />
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
            <div className="space-y-1.5">
              <Label className="text-slate-700 text-sm">Genre</Label>
              <Select 
                value={formData.genre}
                onValueChange={(val) => setFormData({ ...formData, genre: val})}
              >
                <SelectTrigger className="bg-slate-50 border-slate-200 h-9">
                  <SelectValue placeholder="Select" />
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-slate-700 text-sm">Target Audience</Label>
              <Input 
                placeholder="e.g. Juniors" 
                className="bg-slate-50 border-slate-200 h-9"
                value={formData.targetAudience}
                onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-slate-700 text-sm">Tone</Label>
              <Select 
                value={formData.tone}
                onValueChange={(val) => setFormData({ ...formData, tone: val})}
              >
                <SelectTrigger className="bg-slate-50 border-slate-200 h-9">
                  <SelectValue placeholder="Select" />
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
          <div className="space-y-1.5">
            <Label className="text-slate-700 text-sm">Duration</Label>
            <Select 
               value={formData.duration}
               onValueChange={(val) => setFormData({ ...formData, duration: val})}
             >
               <SelectTrigger className="bg-slate-50 border-slate-200 h-9">
                 <SelectValue placeholder="Select duration" />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value="short">Short (Under 60s)</SelectItem>
                 <SelectItem value="medium">Medium (2-5 mins)</SelectItem>
                 <SelectItem value="long">Long (10+ mins)</SelectItem>
               </SelectContent>
             </Select>
          </div>

          {/* ADDITIONAL INFO */}
          <div className="space-y-1.5">
            <Label className="text-slate-700 text-sm">Context</Label>
            <Input 
              placeholder="e.g. CTA: Subscribe..." 
              className="bg-slate-50 border-slate-200 h-9"
              value={formData.additionalInfo}
              onChange={(e) => setFormData({...formData, additionalInfo: e.target.value})}
            />
          </div>
        </div>

        {/* Footer - Updated Button Style (Dark/Slate) */}
        <div className="p-4 border-t border-slate-100 bg-white sticky bottom-0 lg:static z-20">
          <Button 
            onClick={handleGenerate}
            disabled={loading}
            // CHANGED: Removed Indigo, added Slate-900 (standard shadcn dark theme)
            className="w-full h-10 text-sm font-medium bg-slate-900 hover:bg-slate-800 text-white shadow-sm transition-all"
          >
            {loading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" /> Generate Script
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
        className="flex-1 p-4 lg:p-8 bg-slate-50 lg:bg-white lg:overflow-hidden flex flex-col h-full"
      >
        <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">Generated Script</h2>
                {script && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => copyContent(script)}
                    >
                        <Copy className="w-4 h-4 mr-2"/> Copy
                    </Button>
                )}
            </div>
            
            <Card className="p-6 lg:p-8 bg-white border border-slate-200 shadow-sm min-h-[300px] max-h-[65vh] overflow-y-auto ">
              {script ? (
                  <pre className="whitespace-pre-wrap text-slate-900 font-sans text-sm lg:text-base leading-relaxed">
                      {script}
                  </pre>
              ) : (
                  <div className="h-full w-full flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                  {/* Icon Container with Shadow */}
                  <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-white shadow-sm ring-1 ring-slate-900/5">
                    <Sparkles className="w-8 h-8 text-indigo-500/80" />
                  </div>
                  
                  {/* Typography with Hierarchy */}
                  <h3 className="text-lg font-semibold text-slate-900">
                    Ready to create?
                  </h3>
                  <p className="max-w-xs mt-2 text-sm text-slate-500">
                    Fill in the details on the left and watch the AI generate your script here.
                  </p>
                </div>
              )}
          </Card>
        </div>
      </div>
    </div>
  );
}