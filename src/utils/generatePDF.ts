import puppeteer, { PaperFormat } from 'puppeteer';


export default async function generatePdf(URL:string) {
    let browser;
    let pdf;

    const browserConfig = {
        headless: false,
        defaultViewport: {
            width: 750,
            height: 500,
            deviceScaleFactor: 1,
            isMobile: true,
            hasTouch: false,
            isLandscape: false,
        },
    };

    const pdfConfig: {
        format: PaperFormat;
        printBackground: boolean;
        margin: {
            top: string;
            bottom: string;
            left: string;
            right: string;
        };
    } = {
        format: 'A4',
        printBackground: true,
        margin: {
            top: "2cm",
            bottom: "2cm",
            left: "0.5cm",
            right: "0.5cm",
        },
    };

    try {
        console.log("Lanzando navegador");
        browser = await puppeteer.launch(browserConfig);
        console.log("Navegador lanzado, abriendo página");

        const page = await browser.newPage();
        console.log("URL a cargar:", URL);
        await page.goto(URL, { waitUntil: 'networkidle2' });
        
        console.log("Generando PDF");
        pdf = await page.pdf(pdfConfig);
        console.log("PDF generado exitosamente");

    } catch (error) {
        console.error("Error durante la generación del PDF:", error);
        throw error;  // Propaga el error para que el llamador pueda manejarlo si es necesario

    } finally {
        if (browser) {
            console.log("Cerrando navegador");
            await browser.close();
        }
    }

    return pdf;
}
