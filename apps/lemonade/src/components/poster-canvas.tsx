import { useMemo, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle, Ellipse, G, Path, Polygon } from "react-native-svg";

import { COLORS, fieldColor } from "@/brand";
import { BOARDS, pointsToPath, type StickerKind, type Stroke } from "@/poster";
import { useStand } from "@/store";

type Tool = "draw" | "erase" | "sticker";

export function PosterCanvas({
  tool,
  color,
  brush,
  sticker,
}: {
  tool: Tool;
  color: string;
  brush: number;
  sticker: StickerKind;
}) {
  const { stand, addStroke, addSticker } = useStand();
  const poster = stand.poster;
  const field = fieldColor(stand.template);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [live, setLive] = useState<Stroke | null>(null);
  const liveRef = useRef<Stroke | null>(null);

  const board = BOARDS[poster.board];
  const fitted = useMemo(() => {
    if (!box.w || !box.h) return { w: 0, h: 0 };
    const aspect = board.inches.w / board.inches.h;
    let w = box.w;
    let h = w / aspect;
    if (h > box.h) {
      h = box.h;
      w = h * aspect;
    }
    return { w, h };
  }, [board.inches.h, board.inches.w, box.h, box.w]);

  function loc(event: { nativeEvent: { locationX?: number; locationY?: number } }) {
    const x = event.nativeEvent.locationX ?? 0;
    const y = event.nativeEvent.locationY ?? 0;
    if (!fitted.w || !fitted.h) return null;
    return {
      x: Math.min(1, Math.max(0, x / fitted.w)),
      y: Math.min(1, Math.max(0, y / fitted.h)),
    };
  }

  function startDraw(event: { nativeEvent: { locationX?: number; locationY?: number } }) {
    if (tool === "sticker") {
      const point = loc(event);
      if (!point) return;
      addSticker({
        id: `sticker-${Date.now()}`,
        kind: sticker,
        x: point.x,
        y: point.y,
        scale: 0.08,
      });
      return;
    }
    const point = loc(event);
    if (!point) return;
    const stroke: Stroke = {
      id: `stroke-${Date.now()}`,
      points: [point],
      color,
      width: brush,
      erase: tool === "erase",
    };
    liveRef.current = stroke;
    setLive(stroke);
  }

  function moveDraw(event: { nativeEvent: { locationX?: number; locationY?: number } }) {
    if (tool === "sticker") return;
    const point = loc(event);
    const current = liveRef.current;
    if (!point || !current) return;
    const last = current.points[current.points.length - 1];
    const dx = point.x - last.x;
    const dy = point.y - last.y;
    if (dx * dx + dy * dy < 0.00012) return;
    const next = { ...current, points: [...current.points, point] };
    liveRef.current = next;
    setLive(next);
  }

  function endDraw() {
    const current = liveRef.current;
    liveRef.current = null;
    setLive(null);
    if (current && current.points.length) addStroke(current);
  }

  const strokes = live ? [...poster.strokes, live] : poster.strokes;

  return (
    <View
      style={styles.wrap}
      onLayout={(event) => {
        const { width, height } = event.nativeEvent.layout;
        setBox({ w: width, h: height });
      }}
    >
      <View
        style={[
          styles.board,
          {
            width: fitted.w || "100%",
            height: fitted.h || "100%",
            backgroundColor: field,
          },
        ]}
        onStartShouldSetResponder={() => true}
        onResponderGrant={startDraw}
        onResponderMove={moveDraw}
        onResponderRelease={endDraw}
        onResponderTerminate={endDraw}
      >
        <View pointerEvents="none" style={styles.type}>
          <Text style={styles.kicker}>This Saturday</Text>
          <Text style={styles.name}>{stand.standName || "Lemonade Stand"}</Text>
          <Text style={styles.kid}>
            {stand.kidName ? `${stand.kidName} invents it.` : "Draw it. Crooked is fine."}
          </Text>
        </View>
        {fitted.w > 0 ? (
          <Svg width={fitted.w} height={fitted.h} style={StyleSheet.absoluteFill}>
            {strokes.map((stroke) => {
              const d = pointsToPath(stroke.points, fitted.w, fitted.h);
              if (!d) return null;
              return (
                <Path
                  key={stroke.id}
                  d={d}
                  stroke={stroke.erase ? field : stroke.color}
                  strokeWidth={stroke.width * fitted.w}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              );
            })}
            {poster.stickers.map((item) => (
              <StickerMark
                key={item.id}
                kind={item.kind}
                x={item.x * fitted.w}
                y={item.y * fitted.h}
                size={item.scale * fitted.w}
              />
            ))}
          </Svg>
        ) : null}
      </View>
    </View>
  );
}

function StickerMark({
  kind,
  x,
  y,
  size,
}: {
  kind: StickerKind;
  x: number;
  y: number;
  size: number;
}) {
  const ink = COLORS.ink;
  if (kind === "star") {
    return (
      <Polygon
        transform={`translate(${x} ${y})`}
        points={`0,${-size} ${size * 0.22},${-size * 0.28} ${size * 0.95},${-size * 0.3} ${size * 0.36},${size * 0.12} ${size * 0.59},${size * 0.88} 0,${size * 0.4} ${-size * 0.59},${size * 0.88} ${-size * 0.36},${size * 0.12} ${-size * 0.95},${-size * 0.3} ${-size * 0.22},${-size * 0.28}`}
        fill={COLORS.lemonade}
        stroke={ink}
        strokeWidth={size * 0.08}
      />
    );
  }
  if (kind === "sun") {
    return (
      <G transform={`translate(${x} ${y})`}>
        <Circle r={size * 0.42} fill={COLORS.lemonade} stroke={ink} strokeWidth={size * 0.08} />
        <Circle r={size * 0.12} fill={ink} />
      </G>
    );
  }
  if (kind === "lemon") {
    return (
      <G transform={`translate(${x} ${y})`}>
        <Ellipse rx={size * 0.55} ry={size * 0.4} fill={COLORS.lemonade} stroke={ink} strokeWidth={size * 0.08} />
        <Ellipse
          rx={size * 0.12}
          ry={size * 0.08}
          cx={-size * 0.12}
          cy={-size * 0.08}
          fill={COLORS.cream}
        />
      </G>
    );
  }
  if (kind === "cup") {
    return (
      <G transform={`translate(${x} ${y})`}>
        <Path
          d={`M ${-size * 0.35} ${-size * 0.35} L ${size * 0.35} ${-size * 0.35} L ${size * 0.22} ${size * 0.45} L ${-size * 0.22} ${size * 0.45} Z`}
          fill={COLORS.cream}
          stroke={ink}
          strokeWidth={size * 0.08}
        />
        <Ellipse
          cx={0}
          cy={-size * 0.35}
          rx={size * 0.35}
          ry={size * 0.1}
          fill={COLORS.lemonade}
          stroke={ink}
          strokeWidth={size * 0.06}
        />
      </G>
    );
  }
  if (kind === "heart") {
    return (
      <Path
        transform={`translate(${x} ${y})`}
        d={`M 0 ${size * 0.42} C ${-size * 0.7} ${size * 0.05} ${-size * 0.55} ${-size * 0.5} 0 ${-size * 0.18} C ${size * 0.55} ${-size * 0.5} ${size * 0.7} ${size * 0.05} 0 ${size * 0.42} Z`}
        fill={COLORS.raspberry}
        stroke={ink}
        strokeWidth={size * 0.08}
      />
    );
  }
  return (
    <G transform={`translate(${x} ${y})`}>
      <Path
        d={`M ${-size * 0.5} 0 L ${size * 0.2} 0 L ${size * 0.2} ${-size * 0.28} L ${size * 0.55} 0 L ${size * 0.2} ${size * 0.28} L ${size * 0.2} 0 Z`}
        fill={COLORS.coral}
        stroke={ink}
        strokeWidth={size * 0.08}
      />
    </G>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: "center", justifyContent: "center", minHeight: 220 },
  board: {
    borderWidth: 3,
    borderColor: COLORS.ink,
    borderRadius: 8,
    overflow: "hidden",
  },
  type: { position: "absolute", top: 0, right: 0, bottom: 0, left: 0, padding: 12 },
  kicker: {
    fontFamily: "Nunito_800ExtraBold",
    fontSize: 11,
    textTransform: "uppercase",
    color: COLORS.ink,
  },
  name: { fontFamily: "Fredoka_700Bold", fontSize: 28, lineHeight: 30, color: COLORS.ink, marginTop: 2 },
  kid: { fontFamily: "Nunito_600SemiBold", fontSize: 13, color: COLORS.ink, marginTop: 2 },
});
