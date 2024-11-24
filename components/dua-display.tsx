"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Dua {
  arabic: string;
  transliteration?: string;
  english: string;
  reference?: string;
}

interface DuaDisplayProps {
  title: string;
  dua: Dua;
  isExpanded: boolean;
  onToggle: () => void;
}

export const DuaDisplay = ({ title, dua, isExpanded, onToggle }: DuaDisplayProps) => {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between items-center">
          <span>{title}</span>
          <Button variant="ghost" size="sm" onClick={onToggle}>
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CardTitle>
      </CardHeader>
      {isExpanded && (
        <CardContent>
          <div className="space-y-4">
            <div className="text-right font-arabic text-3xl leading-loose tracking-wider">
              {dua.arabic}
            </div>
            <div className="text-sm">
              {dua.english}
            </div>
            {dua.reference && (
              <div className="text-xs text-muted-foreground">
                Reference: {dua.reference}
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
};
