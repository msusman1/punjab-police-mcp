import {chromium, Browser, Page} from "playwright";
import {Helpline, Service} from "@/app/types/datatypes";

export function getHelpLineNumbers() {
    const helplineNumbers: Helpline[] = [
        {name: 'Police Helpline', phone_number: '15'},
        {name: 'Traffic Police', phone_number: '1915'},
        {name: 'Emergency Medical Service', phone_number: '1122'},
        {name: 'Anti-Corruption Establishment', phone_number: '111-223-223'},
        {name: 'Fire Brigade', phone_number: '16'},
    ];
    return helplineNumbers;
}

export async function fetchServicesOverviewFromWebsite(url: string): Promise<Service[]> {
    let browser: Browser | undefined;
    try {
        browser = await chromium.launch({headless: true});
        const page: Page = await browser.newPage();
        console.log("page url:", url);
        await page.goto(url, {waitUntil: 'domcontentloaded'});
        return await page.evaluate(() => {
            const data: Service[] = [];
            const navLinks = document.querySelectorAll('.nav-tabs a');
            navLinks.forEach(linkElement => {
                const title = linkElement.textContent?.trim();
                const tabId = linkElement.getAttribute('href')?.substring(1);
                if (title && tabId) {
                    const tabPane = document.getElementById(tabId);

                    if (tabPane) {
                        const descriptionElement = tabPane.querySelector('.text-justify p:not(.services-title)');
                        const description = descriptionElement?.textContent?.trim() || 'No description available.';

                        data.push({title, description});
                    }
                }
            });
            return data;
        });
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error('Error fetching helplines overview with Playwright:', errorMessage);
        throw new Error('Failed to fetch helplines overview from the Punjab Police website.');
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}
