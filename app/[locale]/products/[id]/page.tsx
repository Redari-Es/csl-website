import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, Settings, BarChart } from 'lucide-react';
import SpecificationsTable from '@/components/SpecificationsTable';
import RelatedProducts from '@/components/RelatedProducts';
import TechnicalDocs from '@/components/TechnicalDocs';
import Image from 'next/image';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  // 使用 products.detail 命名空间的翻译
  const t = useTranslations('products.detail');
  
  // 使用 products.product 命名空间的翻译
  const productsT = useTranslations('products.product');
  
  // 模拟产品数据
  const product = {
    id: params.id,
    name: `${productsT('items.0.name')} ${params.id}`,
    description: productsT('items.0.description'),
    category: Object.values(productsT.raw('categories'))[0],
    features: [
      `${productsT('items.0.features.0')}`,
      `${productsT('items.0.features.1')}`,
      `${productsT('items.0.features.2')}`
    ],
    specifications: [
      { name: t('specificationsList.inputVoltage'), value: "100-240V AC" },
      { name: t('specificationsList.outputPower'), value: "500W" },
      { name: t('specificationsList.efficiency'), value: "≥95%" },
      { name: t('specificationsList.operatingTemp'), value: "-20°C to +70°C" },
      { name: t('specificationsList.dimensions'), value: "150 x 80 x 40 mm" },
      { name: t('specificationsList.weight'), value: "0.8 kg" }
    ],
    images: [
      "/images/pic-2.png",
      "/images/pic-2.png", 
      "/images/pic-2.png",
    ]
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左侧产品信息 */}
        <div className="lg:col-span-2">
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            {/* 产品图片 - 添加悬停放大效果 */}
            <div className="w-full md:w-1/2">
              {/* 主图容器 */}
              <div className="group relative overflow-hidden rounded-xl bg-muted aspect-square w-full h-80 mb-4">
                {/* 实际应用中替换为您的产品图片 */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10"></div>
                
                {/* 图片占位符 - 实际使用时替换为 Image 组件 */}
                <div className="w-full h-full flex items-center justify-center">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-64 h-64 transition-transform duration-500 group-hover:scale-110" />
                </div>
                
                {/* 产品名称水印 */}
                <div className="absolute bottom-4 left-4 bg-background/80 px-3 py-1 rounded-md backdrop-blur-sm">
                  <span className="font-medium text-primary">{product.name}</span>
                </div>
              </div>
              
              {/* 缩略图列表 */}
              <div className="flex gap-3 mt-4">
                {product.images.map((img, index) => (
                  <div 
                    key={index}
                    className="group relative cursor-pointer rounded-md overflow-hidden w-16 h-16 border-2 border-muted"
                  >
                    {/* 实际应用中替换为缩略图 */}
                    <div className="w-full h-full bg-gray-200 border border-muted-foreground/20 transition-transform duration-300 group-hover:scale-110" />
                    
                    {/* 悬停时的高亮边框 */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary transition-colors rounded-md"></div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* 产品详情 */}
            <div className="w-full md:w-1/2">
              <Badge variant="secondary" className="mb-4">
                {product.category}
              </Badge>
              <h1 className="text-2xl md:text-3xl font-bold mb-4">{product.name}</h1>
              <p className="text-muted-foreground mb-6">{product.description}</p>
              
              <ul className="mb-6 space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <span className="ml-2">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="flex flex-wrap gap-3 mb-6">
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  {t('downloadDatasheet')}
                </Button>
                <Button variant="outline">
                  {t('requestQuote')}
                </Button>
              </div>
            </div>
          </div>
          
          {/* 产品标签页 */}
          <Tabs defaultValue="specs" className="w-full">
            <TabsList>
              <TabsTrigger value="specs" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                {t('specifications')}
              </TabsTrigger>
              <TabsTrigger value="docs" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                {t('documentation')}
              </TabsTrigger>
              <TabsTrigger value="performance" className="flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                {t('performance')}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="specs">
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>{t('technicalSpecifications')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <SpecificationsTable specs={product.specifications} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="docs">
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>{t('documentationResources')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <TechnicalDocs />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="performance">
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>{t('performanceData')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                    <p className="text-muted-foreground">{t('performanceChartsPlaceholder')}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* 右侧相关产品和资源 */}
        <div>
          <RelatedProducts currentProductId={product.id} />
          
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>{t('supportResources')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  {t('downloadSoftware')}
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  {t('applicationNotes')}
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  {t('configurationTool')}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>{t('contactSales')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {t('contactSalesDescription')}
              </p>
              <Button className="w-full">
                {t('contactSalesTeam')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}