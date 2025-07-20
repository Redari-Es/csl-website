'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { Download, BookOpen, HelpCircle, Calendar, Headphones, Phone, Mail, Settings, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

// 通用卡片组件
const FeatureCard = ({ title, description, Icon, index }: { 
  title: string, 
  description: string, 
  Icon: React.ElementType,
  index: number
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="h-full"
    >
      <div 
        className="h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700 shadow-xl relative overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* 悬停效果 */}
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 pointer-events-none z-0"></div>
        )}
        
        {/* 装饰元素 */}
        <div className="absolute -top-12 -right-12 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl z-0"></div>
        
        <div className="relative z-10">
          <div className="flex items-center mb-5">
            <div className="bg-gradient-to-br from-cyan-700 to-cyan-900 p-3 rounded-xl mr-4">
              <Icon className="h-6 w-6 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-cyan-300">{title}</h3>
          </div>
          
          <p className="text-gray-400 mb-8 min-h-[80px]">{description}</p>
          
          <motion.div 
            className="flex justify-center"
            animate={{ 
              y: isHovered ? [-2, 2, -2] : 0 
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5,
              ease: "easeInOut",
              repeatType: "reverse"
            }}
          >
            <Button 
              variant="outline" 
              className="bg-cyan-900/40 hover:bg-cyan-800 border border-cyan-600 text-cyan-300 group px-6 py-5 rounded-xl"
            >
              Learn More
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default function SupportPage() {
  const t = useTranslations('support');
  
  // 资源数据
  const resources = [
    { 
      title: t('resources.downloads'), 
      description: t('resources.downloadsDescription'),
      icon: Download 
    },
    { 
      title: t('resources.documentation'), 
      description: t('resources.documentationDescription'),
      icon: BookOpen 
    },
    { 
      title: t('resources.faq'), 
      description: t('resources.faqDescription'),
      icon: HelpCircle 
    }
  ];
  
  // 服务数据
  const services = [
    { 
      title: t('services.training'), 
      description: t('services.trainingDescription'),
      icon: Calendar 
    },
    { 
      title: t('services.consulting'), 
      description: t('services.consultingDescription'),
      icon: Headphones 
    },
    { 
      title: t('services.maintenance'), 
      description: t('services.maintenanceDescription'),
      icon: Settings 
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="container mx-auto px-4 py-12 relative"
    >
      {/* 装饰背景元素 */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-cyan-900/20 to-transparent -z-10"></div>
      <div className="absolute top-20 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-40 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl -z-10"></div>
      
      {/* 标题区域 */}
      <motion.div 
        className="text-center mb-16 max-w-3xl mx-auto"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        <motion.div 
          className="inline-block mb-6"
          whileHover={{ scale: 1.05 }}
        >
          <div className="bg-cyan-900/40 border border-cyan-700/50 rounded-full px-6 py-2 inline-block mb-4">
            <span className="text-cyan-400 font-medium">{t('supportTagline')}</span>
          </div>
        </motion.div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          {t('title')}
        </h1>
        
        <p className="text-xl text-gray-400">
          {t('subtitle')}
        </p>
      </motion.div>
      
      {/* 资源部分 */}
      <motion.div 
        className="mb-20"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <div className="flex flex-col items-center mb-10">
          <motion.div 
            className="flex items-center mb-6 w-full max-w-2xl"
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -20 }}
            transition={{ delay: 0.5 }}
          >
            <div className="h-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 flex-grow mr-4"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-cyan-400 whitespace-nowrap">{t('resources.title')}</h2>
            <div className="h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 flex-grow ml-4"></div>
          </motion.div>
          
          <p className="text-gray-500 text-center max-w-2xl mb-10">
            {t('resources.description')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <FeatureCard 
              key={index} 
              title={resource.title}
              description={resource.description}
              Icon={resource.icon}
              index={index}
            />
          ))}
        </div>
      </motion.div>
      
      {/* 服务部分 */}
      <motion.div 
        className="mb-20"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <div className="flex flex-col items-center mb-10">
          <motion.div 
            className="flex items-center mb-6 w-full max-w-2xl"
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -20 }}
            transition={{ delay: 0.7 }}
          >
            <div className="h-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 flex-grow mr-4"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-cyan-400 whitespace-nowrap">{t('services.title')}</h2>
            <div className="h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 flex-grow ml-4"></div>
          </motion.div>
          
          <p className="text-gray-500 text-center max-w-2xl mb-10">
            {t('services.description')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <FeatureCard 
              key={index} 
              title={service.title}
              description={service.description}
              Icon={service.icon}
              index={index}
            />
          ))}
        </div>
      </motion.div>
      
      {/* 联系支持 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.7 }}
        className="mb-16"
      >
        <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center text-2xl">
              <Headphones className="mr-3 h-8 w-8 text-cyan-400" />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {t('contact.title')}
              </span>
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* 左侧信息 */}
              <div className="space-y-8">
                <p className="text-gray-300 text-lg leading-relaxed">
                  {t('contact.description')}
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1 mr-4">
                      <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                    </div>
                    <div>
                      <h3 className="font-medium text-cyan-300 text-lg mb-1">{t('contact.supportHours')}</h3>
                      <p className="text-gray-300">
                        <span className="text-cyan-400 font-medium">24/7</span> {t('contact.criticalSupport')}, 
                        <span className="block mt-1">{t('contact.businessHours')}</span>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1 mr-4">
                      <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                    </div>
                    <div>
                      <h3 className="font-medium text-cyan-300 text-lg mb-1">{t('contact.responseTime')}</h3>
                      <p className="text-gray-300">
                        {t('contact.criticalResponse')} <span className="text-cyan-400 font-medium">2 {t('contact.hours')}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 右侧按钮 - 左对齐 */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-700/30">
                <div className="space-y-5">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    animate={{
                      boxShadow: ['0 0 10px rgba(34,211,238,0)', '0 0 20px rgba(34,211,238,0.4)', '0 0 10px rgba(34,211,238,0)']
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: 'reverse'
                    }}
                  >
                    <Button 
                      className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white text-lg py-6 rounded-xl transition-all group"
                    >
                      <Headphones className="mr-3 h-5 w-5 text-white" />
                      <span className="flex-1 text-left">{t('contact.liveChat')}</span>
                      <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <Button 
                      variant="outline" 
                      className="w-full bg-transparent hover:bg-slate-700/50 border border-cyan-600/50 text-cyan-300 text-lg py-6 rounded-xl group"
                    >
                      <Phone className="mr-3 h-5 w-5" />
                      <span className="flex-1 text-left">{t('contact.callSupport')}</span>
                      <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <Button 
                      variant="outline" 
                      className="w-full bg-transparent hover:bg-slate-700/50 border border-cyan-600/50 text-cyan-300 text-lg py-6 rounded-xl group"
                    >
                      <Mail className="mr-3 h-5 w-5" />
                      <span className="flex-1 text-left">{t('contact.emailSupport')}</span>
                      <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </motion.div>
                  
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <Button 
                      variant="outline" 
                      className="w-full bg-transparent hover:bg-slate-700/50 border border-cyan-600/50 text-cyan-300 text-lg py-6 rounded-xl group"
                    >
                      <Calendar className="mr-3 h-5 w-5" />
                      <span className="flex-1 text-left">{t('contact.scheduleCall')}</span>
                      <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div> 
      
      {/* 底部装饰 */}
      <div className="text-center py-8 text-gray-500">
        <p>{t('additionalSupport')}</p>
      </div>
    </motion.div>
  );
}