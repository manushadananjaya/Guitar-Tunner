'use client';

import React, { useMemo, useEffect, useRef } from 'react';
import { getNeedleAngle } from '@/lib/noteMap';

interface TunerGaugeProps {
  cents: number; // -50 to +50
  isInTune: boolean;
  centOffset: number;
  maxCents?: number;
}

export function TunerGauge({
  cents,
  isInTune,
  centOffset,
  maxCents = 50,
}: TunerGaugeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const currentAngleRef = useRef<number>(180); // Start at flat

  const needleAngle = useMemo(() => {
    // Convert cents (-50 to +50) to angle (0 to 360 degrees)
    // 0 = center/in-tune, negative = flat, positive = sharp
    const angle = 90 + (cents / maxCents) * 90;
    return Math.max(0, Math.min(180, angle));
  }, [cents, maxCents]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = (height * 2) / 3;
    const radius = Math.min(width, height) * 0.35;

    // Animate the needle
    const animate = () => {
      // Smoothly animate to target angle
      const diff = needleAngle - currentAngleRef.current;
      const maxStep = 3; // Max degrees per frame
      if (Math.abs(diff) > maxStep) {
        currentAngleRef.current +=
          diff > 0 ? maxStep : -maxStep;
      } else {
        currentAngleRef.current = needleAngle;
      }

      // Clear canvas
      ctx.fillStyle = 'rgba(10, 14, 39, 0)';
      ctx.clearRect(0, 0, width, height);

      // Draw gauge background
      drawGaugeBackground(ctx, centerX, centerY, radius, isInTune);

      // Draw scale markers
      drawScaleMarkers(ctx, centerX, centerY, radius);

      // Draw needle
      drawNeedle(ctx, centerX, centerY, radius, currentAngleRef.current, isInTune);

      // Draw center cap
      ctx.fillStyle = '#f0f0ff';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 10, 0, Math.PI * 2);
      ctx.fill();

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isInTune, needleAngle]);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <canvas
        ref={canvasRef}
        width={300}
        height={200}
        className="w-full max-w-sm drop-shadow-lg"
      />
      <div className="flex gap-8 text-sm font-semibold">
        <div className="text-center">
          <div className="text-xs text-muted-foreground mb-1">FLAT</div>
          <div className={`${centOffset < -2 ? 'text-orange-400' : 'text-muted-foreground'}`}>
            ♭
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-muted-foreground mb-1">IN TUNE</div>
          <div className={`${isInTune ? 'text-green-400 animate-pulse' : 'text-muted-foreground'}`}>
            ✓
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-muted-foreground mb-1">SHARP</div>
          <div className={`${centOffset > 2 ? 'text-orange-400' : 'text-muted-foreground'}`}>
            ♯
          </div>
        </div>
      </div>
    </div>
  );
}

function drawGaugeBackground(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  isInTune: boolean
) {
  // Outer circle
  const gradient = ctx.createRadialGradient(
    centerX,
    centerY,
    0,
    centerX,
    centerY,
    radius
  );

  if (isInTune) {
    gradient.addColorStop(0, 'rgba(0, 255, 0, 0.1)');
    gradient.addColorStop(1, 'rgba(0, 255, 0, 0.05)');
  } else {
    gradient.addColorStop(0, 'rgba(255, 100, 0, 0.05)');
    gradient.addColorStop(1, 'rgba(255, 100, 0, 0.02)');
  }

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.fill();

  // Border
  ctx.strokeStyle = isInTune ? 'rgba(0, 255, 0, 0.3)' : 'rgba(255, 100, 0, 0.2)';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Bottom gauge arc
  ctx.strokeStyle = '#2d3448';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius - 5, Math.PI * 0.2, Math.PI * 0.8, false);
  ctx.stroke();

  // In-tune zone highlight
  ctx.strokeStyle = isInTune
    ? 'rgba(0, 255, 0, 0.4)'
    : 'rgba(0, 255, 0, 0.15)';
  ctx.lineWidth = 6;
  ctx.beginPath();
  const startAngle = Math.PI * 0.35;
  const endAngle = Math.PI * 0.65;
  ctx.arc(centerX, centerY, radius - 5, startAngle, endAngle, false);
  ctx.stroke();
}

function drawScaleMarkers(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number
) {
  const startAngle = (Math.PI * 0.2) / 1;
  const endAngle = (Math.PI * 0.8) / 1;
  const steps = 12;

  for (let i = 0; i <= steps; i++) {
    const angle = startAngle + ((endAngle - startAngle) / steps) * i;
    const isCenter = i === steps / 2;
    const isQuarter = i % (steps / 4) === 0 && i !== steps / 2;

    const lineWidth = isCenter ? 0.5 : isQuarter ? 0.4 : 0.3;
    const lineLength = isCenter ? 18 : isQuarter ? 14 : 10;

    const x1 = centerX + Math.cos(angle) * (radius - 8);
    const y1 = centerY + Math.sin(angle) * (radius - 8);
    const x2 = centerX + Math.cos(angle) * (radius - 8 - lineLength);
    const y2 = centerY + Math.sin(angle) * (radius - 8 - lineLength);

    ctx.strokeStyle = isCenter ? '#00ff00' : isQuarter ? '#9095a8' : '#5a6b8a';
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
}

function drawNeedle(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  angle: number,
  isInTune: boolean
) {
  // Convert angle to radians (0-180 degrees = PI radians)
  const angleRad = (angle / 180) * Math.PI;

  // Needle length
  const needleLength = radius - 15;

  // End point of needle
  const endX = centerX + Math.cos(angleRad) * needleLength;
  const endY = centerY + Math.sin(angleRad) * needleLength;

  // Draw needle
  ctx.strokeStyle = isInTune ? '#00ff00' : '#ff6600';
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(endX, endY);
  ctx.stroke();

  // Draw needle glow when in tune
  if (isInTune) {
    ctx.strokeStyle = 'rgba(0, 255, 0, 0.3)';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  }
}
