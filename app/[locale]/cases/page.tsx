'use client'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

// 注册GSAP插件
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CasesPage() {
  const t = useTranslations("casesPage");
  const caseRefs = [useRef(null), useRef(null), useRef(null)];
  const sectionRef = useRef(null);
  
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // 页面加载动画
    gsap.fromTo(
      ".page-title",
      { opacity: 0, y: -30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1,
        ease: "power3.out"
      }
    );
    
    gsap.fromTo(
      ".page-subtitle",
      { opacity: 0 },
      { 
        opacity: 1, 
        duration: 1.2,
        delay: 0.3,
        ease: "sine.out"
      }
    );
    
    // 案例卡片动画
    caseRefs.forEach((ref, index) => {
      if (!ref.current) return;
      
      gsap.fromTo(
        ref.current,
        { 
          opacity: 0,
          y: 80,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          delay: index * 0.15,
          ease: "back.out(1.2)"
        }
      );
    });
    
    // 背景装饰元素动画
    const circles = gsap.utils.toArray(".decoration-circle");
    circles.forEach((circle: any, i) => {
      gsap.fromTo(
        circle,
        { 
          opacity: 0,
          scale: 0.2
        },
        {
          opacity: 0.15,
          scale: 1,
          duration: 1.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 30%",
            scrub: 1
          },
          delay: i * 0.2
        }
      );
    });
    
    // 底部CTA动画
    gsap.fromTo(
      ".cta-section",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".cta-section",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  }, []);
  
  return (
    <div className="relative overflow-hidden">
      {/* 装饰性背景元素 */}
      <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-primary opacity-10 decoration-circle" />
      <div className="absolute bottom-40 right-10 w-60 h-60 rounded-full bg-primary opacity-10 decoration-circle" />
      <div className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-primary opacity-10 decoration-circle" />
      
      <div 
        ref={sectionRef} 
        className="container mx-auto px-4 py-16 relative z-10"
      >
        {/* 页面标题部分 */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="page-title text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            {t("title")}
          </h1>
          <p className="page-subtitle text-xl text-muted-foreground">
            {t("subtitle")}
          </p>
          <p className="page-subtitle mt-8 text-lg text-foreground/80">
            {t("description")}
          </p>
        </div>
        
        {/* 案例研究网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* 案例1 */}
          <Card ref={caseRefs[0]} className="border-border shadow-xl hover:shadow-2xl transition-all duration-300 bg-background/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary">
                {t("caseStudy1.title")}
              </CardTitle>
              <CardDescription className="text-lg font-medium">
                {t("caseStudy1.description")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-foreground/90 leading-relaxed">
                {t("caseStudy1.content")}
              </p>
              <div className="flex flex-wrap gap-2">
                {t.raw("caseStudy1.technologies").map((tech, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="bg-primary/10 text-primary border-primary/30"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="ml-auto border-primary text-primary hover:bg-primary/10">
                {t("viewDetails")}
              </Button>
            </CardFooter>
          </Card>
          
          {/* 案例2 */}
          <Card ref={caseRefs[1]} className="border-border shadow-xl hover:shadow-2xl transition-all duration-300 bg-background/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary">
                {t("caseStudy2.title")}
              </CardTitle>
              <CardDescription className="text-lg font-medium">
                {t("caseStudy2.description")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-foreground/90 leading-relaxed">
                {t("caseStudy2.content")}
              </p>
              <div className="flex flex-wrap gap-2">
                {t.raw("caseStudy2.technologies").map((tech, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="bg-primary/10 text-primary border-primary/30"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="ml-auto border-primary text-primary hover:bg-primary/10">
                {t("viewDetails")}
              </Button>
            </CardFooter>
          </Card>
          
          {/* 案例3 */}
          <Card ref={caseRefs[2]} className="border-border shadow-xl hover:shadow-2xl transition-all duration-300 bg-background/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary">
                {t("caseStudy3.title")}
              </CardTitle>
              <CardDescription className="text-lg font-medium">
                {t("caseStudy3.description")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-foreground/90 leading-relaxed">
                {t("caseStudy3.content")}
              </p>
              <div className="flex flex-wrap gap-2">
                {t.raw("caseStudy3.technologies").map((tech, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="bg-primary/10 text-primary border-primary/30"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="ml-auto border-primary text-primary hover:bg-primary/10">
                {t("viewDetails")}
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* 底部CTA */}
        <div className="cta-section mt-20 text-center bg-gradient-to-r from-background to-primary/5 p-8 rounded-2xl border border-primary/20">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            {t("contactUs")}
          </h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg text-foreground/85">
            我们的工程师团队随时准备为您提供定制化的射频电源解决方案
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              asChild 
              size="lg" 
              className="bg-primary hover:bg-primary/90 transition-all transform hover:-translate-y-1"
            >
              <Link href="/contact">{t("learnMore")}</Link>
            </Button>
            <Button 
              variant="outline" 
              asChild 
              size="lg"
              className="border-primary text-primary hover:bg-primary/10"
            >
              <Link href="/contact">{t("contactUs")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}