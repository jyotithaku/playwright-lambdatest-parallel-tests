import { Locator, Page, expect } from '@playwright/test';
 
export class DragDropSliderPage {
    readonly page: Page;
    readonly dragDropSliderLink: Locator;
    // Locator for the specific slider (e.g., Default value 15)
    readonly sliderInput: Locator; 
    // Locator for the range value output (e.g., 95)
    readonly rangeValueOutput: Locator; 
 
    constructor(page: Page) {
        this.page = page;
        this.dragDropSliderLink = page.getByRole('link', { name: 'Drag & Drop Sliders', exact: true });
        // The XPath targets the specific slider input with default value 15
        this.sliderInput = page.locator('//h4[text()=" Default value 15"]//..//input[@type="range"]'); 
        // The output span next to the slider input
        this.rangeValueOutput = page.locator('//h4[text()=" Default value 15"]//..//input[@type="range"]//..//output');
    }
 
    async navigateToDragDropSlider() {
        await this.dragDropSliderLink.click();
        await this.page.waitForURL(/drag-drop-range-sliders-demo/);
    }
 
    async dragSliderToValue(targetValue: string) {
        // Dragging requires bounding box or page.mouse, but for simple tests,
        // you can often set the value directly using page.evaluate() or .fill()
        // Here, we use .fill() as Playwright handles setting range input values.
        await this.sliderInput.fill(targetValue);
    }
 
    async validateRangeValue(expectedValue: string) {
        await expect(this.rangeValueOutput).toHaveText(expectedValue);
    }
}
 