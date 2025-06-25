/**
 * CLI欢迎消息和动态效果工具
 * @author my-cli
 */

const chalk = require('chalk');
const logSymbols = require('log-symbols');
const gradient = require('gradient-string/dist/cjs');
const figlet = require('figlet');

/**
 * 走马灯动画字符
 * @type {string[]}
 */
const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

/**
 * 走马灯点的样式
 * @type {object}
 */
const dotStyles = {
    standard: ['.', '..', '...', '....', '.....', '......'],
    arrow: ['→', '→→', '→→→', '→→→→', '→→→→→'],
    pulse: ['•', '••', '•••', '••••', '•••••'],
    star: ['✧', '✧✧', '✧✧✧', '✧✧✧✧', '✧✧✧✧✧']
};

/**
 * 欢迎消息类
 */
class WelcomeMessage {
    /**
     * @param {string} message - 欢迎消息的前缀
     * @param {object} options - 配置选项
     * @param {string} options.dotStyle - 点的样式，可选值：standard, arrow, pulse, star
     * @param {boolean} options.useGradient - 是否使用渐变色
     */
    constructor(message = '欢迎使用', options = {}) {
        this.message = message;
        this.frameIndex = 0;
        this.interval = null;
        this.isDownloading = true;
        this.dotIndex = 0;
        this.dotStyle = options.dotStyle || 'standard';
        this.useGradient = options.useGradient || false;
        this.dots = dotStyles[this.dotStyle][0];
    }

    /**
     * 显示大型ASCII艺术标题
     * @param {string} text - 要显示的文本
     * @param {object} options - 配置选项
     */
    static showTitle(text, options = {}) {
        const defaultFont = options.font || 'Standard';

        return new Promise((resolve) => {
            figlet(text, { font: defaultFont }, (err, data) => {
                if (err) {
                    console.log(chalk.yellow(text));
                    resolve();
                    return;
                }

                if (options.gradient) {
                    const gradientColors = options.gradientColors || ['#FF0000', '#00FF00', '#0000FF'];
                    const gradientFn = gradient(...gradientColors);
                    console.log(gradientFn(data));
                } else {
                    console.log(chalk[options.color || 'cyan'](data));
                }

                resolve();
            });
        });
    }

    /**
     * 开始显示动态欢迎消息
     * @param {number} speed - 动画速度(毫秒)
     * @returns {WelcomeMessage} 当前实例
     */
    start(speed = 100) {
        if (this.interval) {
            return this;
        }

        process.stdout.write('\n');

        this.interval = setInterval(() => {
            // 清除当前行
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);

            // 更新走马灯帧和点的样式
            this.frameIndex = (this.frameIndex + 1) % frames.length;
            this.updateDots();

            // 根据下载状态显示不同颜色
            let coloredMessage;
            const frame = frames[this.frameIndex];

            if (this.useGradient) {
                const gradientColors = this.isDownloading
                    ? ['#FF0000', '#FF5500', '#FF0055']
                    : ['#00FF00', '#00FF55', '#55FF00'];

                const gradientFn = gradient(...gradientColors);
                coloredMessage = gradientFn(`${this.message}${this.dots}`);
            } else {
                const color = this.isDownloading ? chalk.red : chalk.green;
                coloredMessage = color(`${this.message}${this.dots}`);
            }

            // 输出消息
            process.stdout.write(`${frame} ${coloredMessage}`);
        }, speed);

        return this;
    }

    /**
     * 更新走马灯点的样式
     */
    updateDots() {
        const dotsArray = dotStyles[this.dotStyle];
        this.dotIndex = (this.dotIndex + 1) % dotsArray.length;
        this.dots = dotsArray[this.dotIndex];
    }

    /**
     * 设置下载完成状态
     * @returns {WelcomeMessage} 当前实例
     */
    succeed() {
        this.isDownloading = false;
        return this;
    }

    /**
     * 停止动画并清理
     * @param {boolean} [showFinal=true] 是否显示最终成功消息
     */
    stop(showFinal = true) {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;

            // 清除当前行
            process.stdout.clearLine(0);
            process.stdout.cursorTo(0);

            if (showFinal) {
                console.log(`${logSymbols.success} ${chalk.green(`${this.message}完成！`)}`);
            }
        }
        return this;
    }
}

module.exports = WelcomeMessage; 