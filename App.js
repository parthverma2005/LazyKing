import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text, Pressable, StatusBar, StyleSheet } from "react-native";

const demoPlayers = [
  { rank: 1, name: "NapLord", points: 12840, plant: "🌵", flag: "🇺🇸" },
  { rank: 2, name: "Scrollzilla", points: 11620, plant: "🌿", flag: "🇮🇳" },
  { rank: 3, name: "SofaSamurai", points: 10950, plant: "🪴", flag: "🇬🇧" },
  { rank: 4, name: "PillowGoblin", points: 9870, plant: "🌱", flag: "🇨🇦" },
  { rank: 5, name: "LazyLlama", points: 8640, plant: "🌵", flag: "🇦🇺" },
];
const stages = [
  { min: 0, emoji: "🌰", name: "Sleepy Seed" },
  { min: 100, emoji: "🌱", name: "Tiny Sprout" },
  { min: 250, emoji: "🌿", name: "Lazy Leaf" },
  { min: 500, emoji: "🪴", name: "Couch Fern" },
  { min: 1000, emoji: "🌳", name: "Grand Lazy Tree" },
];
function Card({ children, style }) { return <View style={[s.card, style]}>{children}</View>; }

export default function App() {
  const [tab, setTab] = useState("Garden");
  const [points, setPoints] = useState(120);
  const [notice, setNotice] = useState("");
  const stage = [...stages].reverse().find(x => points >= x.min) || stages[0];
  const add = (amount, label) => { setPoints(p => p + amount); setNotice(`+${amount} Lazy Points for ${label}! (demo action)`); };

  return <SafeAreaView style={s.safe}>
    <StatusBar barStyle="dark-content" backgroundColor="#FBF7ED" />
    <ScrollView contentContainerStyle={s.page}>
      <View style={s.header}>
        <View><Text style={s.kicker}>THE UNPRODUCTIVITY CLUB</Text><Text style={s.title}>Lazy King 👑</Text><Text style={s.subtitle}>Do less. Grow more.</Text></View>
        <View style={s.sloth}><Text style={{fontSize:30}}>🦥</Text></View>
      </View>
      <View style={s.tabs}>{["Garden", "Leaderboard", "Rules"].map(t => <Pressable key={t} onPress={() => {setTab(t);setNotice("");}} style={[s.tab, tab===t && s.activeTab]}><Text style={[s.tabText,tab===t&&s.activeTabText]}>{t}</Text></Pressable>)}</View>
      {!!notice && <Pressable onPress={() => setNotice("")} style={s.notice}><Text style={s.noticeText}>{notice}  ×</Text></Pressable>}

      {tab==="Garden" && <>
        <Card style={s.hero}>
          <View style={s.between}><View><Text style={s.eyebrow}>YOUR LAZINESS LEVEL</Text><Text style={s.level}>Level {Math.floor(points/100)+1}</Text></View><Text style={s.pill}>✨ {points} LP</Text></View>
          <View style={s.scene}><Text style={s.sun}>☀️</Text><Text style={s.plant}>{stage.emoji}</Text><View style={s.pot}><Text style={s.face}>ᴗ</Text></View><Text style={s.plantName}>{stage.name}</Text><Text style={s.caption}>Your legendary laziness is blooming.</Text></View>
          <View style={s.between}><Text style={s.mini}>NEXT EVOLUTION</Text><Text style={s.mini}>{points % 100}/100 LP</Text></View>
          <View style={s.track}><View style={[s.fill,{width:`${points%100}%`}]}/></View>
        </Card>
        <View style={s.stats}>
          <Card style={s.stat}><Text style={s.statEmoji}>📱</Text><Text style={s.statNum}>3h 42m</Text><Text style={s.statLabel}>Screen time</Text><Text style={s.demo}>DEMO DATA</Text></Card>
          <Card style={s.stat}><Text style={s.statEmoji}>🚶</Text><Text style={s.statNum}>1,284</Text><Text style={s.statLabel}>Steps today</Text><Text style={s.demo}>DEMO DATA</Text></Card>
        </View>
        <Text style={s.section}>Earn your lazy crown</Text><Text style={s.sectionSub}>Tap to simulate actions and test plant growth.</Text>
        <View style={s.grid}>
          {[["📱","Scroll session","Simulate 30 min",35],["🎮","Gaming session","Simulate 30 min",45],["⏰","Snooze alarm","Simulated snooze",20],["🛋️","Couch day","Simulate low steps",15]].map(([emoji,title,desc,n])=><Pressable key={title} onPress={()=>add(n,title.toLowerCase())} style={s.action}><Text style={s.actionEmoji}>{emoji}</Text><Text style={s.actionTitle}>{title}</Text><Text style={s.actionDesc}>{desc}</Text><Text style={s.points}>+{n} LP</Text></Pressable>)}
        </View>
        <Text style={s.note}>🌼 This is a playful parody. No real tracking is connected, and the demo never rewards dehydration or skipping essential care.</Text>
      </>}

      {tab==="Leaderboard" && <>
        <Card style={s.leaderHero}><Text style={{fontSize:44}}>👑</Text><Text style={s.leaderTitle}>Hall of Laziness</Text><Text style={s.caption}>This week's laziest legends</Text><Text style={s.demoBadge}>DEMO LEADERBOARD · NOT LIVE</Text></Card>
        {demoPlayers.map(p=><Card key={p.rank} style={[s.player,p.rank===1&&s.winner]}><Text style={s.rank}>#{p.rank}</Text><Text style={{fontSize:26}}>{p.plant}</Text><View style={{flex:1}}><Text style={s.playerName}>{p.name}</Text><Text style={s.playerSub}>{p.flag} Sample player</Text></View><Text style={s.points}>{p.points.toLocaleString()} LP</Text></Card>)}
        <Card><Text style={s.cardTitle}>🌍 Real rankings come later</Text><Text style={s.body}>These names and scores are fictional demo data. A live global leaderboard needs accounts, a backend database, server-side scoring, and validated device events.</Text></Card>
      </>}

      {tab==="Rules" && <Card>
        <Text style={s.cardTitle}>🎮 Rules of glorious laziness</Text>
        <Text style={s.body}>Lazy Points (LP) are awarded for supported signals. For now, the buttons on the Garden tab simulate those signals.</Text>
        {[["📱","Social media","Illustrative points for usage, with daily caps."],["🎮","Mobile gaming","Illustrative points for playing, with daily caps."],["⏰","Snoozed alarm","Only an in-app or user-confirmed snooze can be tracked reliably."],["🚶","Low step count","A playful score, not health advice."],["💧","Hydration","Never penalize healthy hydration or reward dehydration."]].map(([e,t,d])=><View key={t} style={s.rule}><Text style={{fontSize:25,width:38}}>{e}</Text><View style={{flex:1}}><Text style={s.ruleTitle}>{t}</Text><Text style={s.body}>{d}</Text></View></View>)}
        <Text style={s.cardTitle}>🔒 Privacy & fairness</Text><Text style={s.body}>No device permissions are requested. Real tracking must be opt-in and validated before it affects competitive rankings.</Text>
      </Card>}
      <View style={s.footer}><Text style={s.footerText}>🌱 A silly game about doing less.</Text><Text style={s.footerText}>MVP preview · device tracking not connected</Text></View>
    </ScrollView>
  </SafeAreaView>;
}

const s = StyleSheet.create({
  safe:{flex:1,backgroundColor:"#FBF7ED"},page:{padding:17,paddingBottom:35,maxWidth:720,width:"100%",alignSelf:"center"},
  header:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginBottom:18},kicker:{fontSize:10,letterSpacing:1.7,fontWeight:"900",color:"#7D986D"},title:{fontSize:32,fontWeight:"900",color:"#2D4933",letterSpacing:-1},subtitle:{color:"#829078",marginTop:3},sloth:{width:56,height:56,borderRadius:20,backgroundColor:"#E5EED9",alignItems:"center",justifyContent:"center"},
  tabs:{flexDirection:"row",padding:4,backgroundColor:"#ECE8DD",borderRadius:15,marginBottom:15},tab:{flex:1,paddingVertical:11,alignItems:"center",borderRadius:11},activeTab:{backgroundColor:"#FFF",elevation:2},tabText:{fontSize:12,fontWeight:"700",color:"#84907D"},activeTabText:{color:"#2D4933"},
  card:{backgroundColor:"#FFF",borderRadius:21,padding:16,marginBottom:12,borderWidth:1,borderColor:"#EEE9DE"},hero:{backgroundColor:"#EAF2E1",borderColor:"#DCE8D1",padding:17},between:{flexDirection:"row",alignItems:"center",justifyContent:"space-between"},eyebrow:{fontSize:10,letterSpacing:1.2,fontWeight:"900",color:"#7D906F"},level:{fontSize:23,fontWeight:"900",color:"#2D4933",marginTop:3},pill:{backgroundColor:"#FFF",borderRadius:20,paddingHorizontal:12,paddingVertical:8,fontWeight:"900",color:"#577A40",overflow:"hidden"},
  scene:{height:220,backgroundColor:"#DDEBCF",borderRadius:17,marginTop:15,marginBottom:15,alignItems:"center",justifyContent:"flex-end",paddingBottom:12,overflow:"hidden"},sun:{position:"absolute",right:17,top:13,fontSize:24},plant:{fontSize:82,marginBottom:-5},pot:{width:103,height:55,backgroundColor:"#D79B72",borderTopWidth:8,borderTopColor:"#B87956",borderRadius:13,alignItems:"center",justifyContent:"center"},face:{fontSize:24,color:"#7B4E38",fontWeight:"900"},plantName:{marginTop:8,fontWeight:"900",fontSize:15,color:"#345638"},caption:{fontSize:11,color:"#718168",marginTop:3},mini:{fontSize:10,fontWeight:"900",letterSpacing:.7,color:"#7C8B71"},track:{height:9,backgroundColor:"#D3E0C8",borderRadius:9,overflow:"hidden",marginTop:7},fill:{height:"100%",backgroundColor:"#79B95F",borderRadius:9},
  stats:{flexDirection:"row",gap:11},stat:{flex:1,alignItems:"center"},statEmoji:{fontSize:24},statNum:{fontSize:18,fontWeight:"900",color:"#2D4933",marginTop:4},statLabel:{fontSize:11,color:"#899283",marginTop:3},demo:{fontSize:8,fontWeight:"900",color:"#98702B",backgroundColor:"#FFF0CD",overflow:"hidden",borderRadius:5,paddingHorizontal:6,paddingVertical:4,marginTop:7},
  section:{fontSize:20,fontWeight:"900",color:"#2D4933",marginTop:7},sectionSub:{fontSize:12,color:"#84907D",marginTop:4,marginBottom:11},grid:{flexDirection:"row",flexWrap:"wrap",gap:10},action:{width:"48%",flexGrow:1,minHeight:137,backgroundColor:"#FFF",borderRadius:17,borderWidth:1,borderColor:"#EDE8DC",padding:13},actionEmoji:{fontSize:25,marginBottom:7},actionTitle:{fontSize:14,fontWeight:"900",color:"#2D4933"},actionDesc:{fontSize:11,color:"#8A9385",marginTop:3},points:{fontSize:13,fontWeight:"900",color:"#639447",marginTop:8},note:{fontSize:11,lineHeight:17,color:"#77836F",marginTop:13,paddingHorizontal:2},
  notice:{backgroundColor:"#E1F1D9",borderWidth:1,borderColor:"#B7D6A8",padding:12,borderRadius:13,marginBottom:13},noticeText:{fontSize:12,fontWeight:"800",color:"#2F6537"},
  leaderHero:{alignItems:"center",backgroundColor:"#EAF2E1",paddingVertical:22},leaderTitle:{fontSize:23,fontWeight:"900",color:"#2D4933",marginTop:5},demoBadge:{fontSize:9,fontWeight:"900",letterSpacing:.5,color:"#906A27",backgroundColor:"#FFF0CD",paddingHorizontal:10,paddingVertical:6,borderRadius:8,overflow:"hidden",marginTop:12},
  player:{flexDirection:"row",alignItems:"center",gap:10,paddingVertical:13},winner:{borderColor:"#E8CA71",backgroundColor:"#FFFCF2"},rank:{width:26,fontSize:14,fontWeight:"900",color:"#75836D"},playerName:{fontSize:14,fontWeight:"900",color:"#2D4933"},playerSub:{fontSize:10,color:"#8A9485",marginTop:3},cardTitle:{fontSize:17,fontWeight:"900",color:"#2D4933",marginBottom:8},body:{fontSize:13,lineHeight:20,color:"#6F7B6A"},rule:{flexDirection:"row",gap:10,alignItems:"center",paddingVertical:13,borderBottomWidth:1,borderBottomColor:"#F0EEE7"},ruleTitle:{fontSize:13,fontWeight:"900",color:"#2D4933"},footer:{alignItems:"center",gap:4,marginTop:10},footerText:{fontSize:10,color:"#9AA394"}
});
