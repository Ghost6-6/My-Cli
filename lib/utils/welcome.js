/**
 * CLI欢迎消息和动态效果工具
 * @author my-cli
 */

const chalk = require('chalk');
const logSymbols = require('log-symbols');

/**
 * 走马灯动画字符
 * @type {string[]}
 */
const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];

/**
 * 欢迎消息类
 */
class WelcomeMessage {
    /**
     * @param {string} message - 欢迎消息的前缀
     */
    constructor(message = '欢迎使用') {
        this.message = message;
        this.frameIndex = 0;
        this.interval = null;
        this.isDownloading = true;
        this.dots = '';
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

            // 更新走马灯帧和点的数量
            this.frameIndex = (this.frameIndex + 1) % frames.length;
            this.updateDots();

            // 根据下载状态显示不同颜色
            const color = this.isDownloading ? chalk.red : chalk.green;
            const frame = frames[this.frameIndex];

            // 输出消息
            process.stdout.write(`${frame} ${color(`${this.message}${this.dots}`)}`);
        }, speed);

        return this;
    }

    /**
     * 更新走马灯点的数量
     */
    updateDots() {
        if (this.dots.length >= 6) {
            this.dots = '.';
        } else {
            this.dots += '.';
        }
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