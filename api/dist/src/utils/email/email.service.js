"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var EmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = __importStar(require("nodemailer"));
const config_1 = require("@nestjs/config");
let EmailService = EmailService_1 = class EmailService {
    configService;
    logger = new common_1.Logger(EmailService_1.name);
    transporter;
    constructor(configService) {
        this.configService = configService;
        this.transporter = nodemailer.createTransport({
            host: this.configService.get('SMTP_HOST', 'smtp.gmail.com'),
            port: this.configService.get('SMTP_PORT', 587),
            secure: this.configService.get('SMTP_SECURE', false),
            auth: {
                user: this.configService.get('SMTP_USER'),
                pass: this.configService.get('SMTP_PASS'),
            },
        });
    }
    async sendEmail(options) {
        const from = options.from || this.configService.get('SMTP_FROM', 'Yeti Homes <noreply@yetihomes.com>');
        try {
            await this.transporter.sendMail({
                from,
                to: options.to,
                subject: options.subject,
                html: options.html,
            });
            this.logger.log(`Email sent to ${options.to}`);
            return true;
        }
        catch (error) {
            this.logger.error(`Failed to send email to ${options.to}`, error);
            return false;
        }
    }
    async sendNewsletterSubscriptionEmail(email, name) {
        const adminEmail = this.configService.get('ADMIN_EMAIL', 'info@yetihomes.com');
        const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #1a472a; padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Yeti Homes</h1>
          <p style="color: #a8d5ba; margin: 10px 0 0 0; font-size: 14px;">Real Estate & Property Solutions</p>
        </div>
        
        <div style="background: #ffffff; padding: 40px 30px; border: 1px solid #e5e5e5; border-top: none; border-radius: 0 0 12px 12px;">
          <h2 style="color: #1a472a; margin: 0 0 20px 0; font-size: 24px;">New Newsletter Subscription! 🎉</h2>
          
          <p style="color: #333333; font-size: 16px; line-height: 1.6;">
            A new user has subscribed to the Yeti Homes newsletter.
          </p>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 5px 0; color: #333333;"><strong>Email:</strong> ${email}</p>
            ${name ? `<p style="margin: 5px 0; color: #333333;"><strong>Name:</strong> ${name}</p>` : ''}
            <p style="margin: 5px 0; color: #333333;"><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <p style="color: #666666; font-size: 14px; margin-top: 30px;">
            This is an automated notification from your Yeti Homes website.
          </p>
        </div>
        
        <div style="text-align: center; padding: 20px; color: #999999; font-size: 12px;">
          <p style="margin: 0;">© ${new Date().getFullYear()} Yeti Homes. All rights reserved.</p>
          <p style="margin: 5px 0 0 0;">Kathmandu, Nepal</p>
        </div>
      </body>
      </html>
    `;
        return this.sendEmail({
            to: adminEmail,
            subject: `📧 New Newsletter Subscriber: ${email}`,
            html,
        });
    }
    async sendSupportTicketNotificationEmail(name, email, subject, message) {
        const adminEmail = this.configService.get('ADMIN_EMAIL', 'info@yetihomes.com');
        const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #1a472a; padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Yeti Homes</h1>
          <p style="color: #a8d5ba; margin: 10px 0 0 0; font-size: 14px;">Real Estate & Property Solutions</p>
        </div>
        
        <div style="background: #ffffff; padding: 40px 30px; border: 1px solid #e5e5e5; border-top: none; border-radius: 0 0 12px 12px;">
          <h2 style="color: #1a472a; margin: 0 0 20px 0; font-size: 24px;">New Support Ticket! 🎫</h2>
          
          <p style="color: #333333; font-size: 16px; line-height: 1.6;">
            A new support ticket has been submitted through the website.
          </p>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 5px 0; color: #333333;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 5px 0; color: #333333;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 5px 0; color: #333333;"><strong>Subject:</strong> ${subject}</p>
            <p style="margin: 5px 0; color: #333333;"><strong>Date:</strong> ${new Date().toLocaleString()}</p>
            <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 15px 0;">
            <p style="margin: 5px 0; color: #333333; white-space: pre-wrap;">${message}</p>
          </div>
          
          <p style="color: #666666; font-size: 14px; margin-top: 30px;">
            Please respond to this ticket as soon as possible.
          </p>
        </div>
        
        <div style="text-align: center; padding: 20px; color: #999999; font-size: 12px;">
          <p style="margin: 0;">© ${new Date().getFullYear()} Yeti Homes. All rights reserved.</p>
          <p style="margin: 5px 0 0 0;">Kathmandu, Nepal</p>
        </div>
      </body>
      </html>
    `;
        return this.sendEmail({
            to: adminEmail,
            subject: `🎫 New Support Ticket: ${subject}`,
            html,
        });
    }
    async sendSubscriptionConfirmationEmail(email, name) {
        const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #1a472a; padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Yeti Homes</h1>
          <p style="color: #a8d5ba; margin: 10px 0 0 0; font-size: 14px;">Real Estate & Property Solutions</p>
        </div>
        
        <div style="background: #ffffff; padding: 40px 30px; border: 1px solid #e5e5e5; border-top: none; border-radius: 0 0 12px 12px;">
          <h2 style="color: #1a472a; margin: 0 0 20px 0; font-size: 24px;">Welcome to Yeti Homes! 🏠</h2>
          
          <p style="color: #333333; font-size: 16px; line-height: 1.6;">
            Dear ${name || 'there'},
          </p>
          
          <p style="color: #333333; font-size: 16px; line-height: 1.6;">
            Thank you for subscribing to the Yeti Homes newsletter! We're excited to have you with us.
          </p>
          
          <p style="color: #333333; font-size: 16px; line-height: 1.6;">
            As a subscriber, you'll receive:
          </p>
          
          <ul style="color: #333333; font-size: 16px; line-height: 1.8; padding-left: 20px;">
            <li>Latest property listings and updates</li>
            <li>Real estate market insights</li>
            <li>Tips for buyers, sellers, and renters</li>
            <li>Exclusive offers and promotions</li>
          </ul>
          
          <div style="margin-top: 30px;">
            <a href="https://www.yetihomes.com" style="display: inline-block; background: #1a472a; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold;">Browse Properties</a>
          </div>
          
          <p style="color: #666666; font-size: 14px; margin-top: 30px;">
            If you have any questions, feel free to contact us at info@yetihomes.com
          </p>
        </div>
        
        <div style="text-align: center; padding: 20px; color: #999999; font-size: 12px;">
          <p style="margin: 0;">© ${new Date().getFullYear()} Yeti Homes. All rights reserved.</p>
          <p style="margin: 5px 0 0 0;">Kathmandu, Nepal</p>
          <p style="margin: 15px 0 0 0;">
            <a href="https://www.yetihomes.com" style="color: #1a472a; text-decoration: none;">Privacy Policy</a> | 
            <a href="https://www.yetihomes.com" style="color: #1a472a; text-decoration: none;">Unsubscribe</a>
          </p>
        </div>
      </body>
      </html>
    `;
        return this.sendEmail({
            to: email,
            subject: 'Welcome to Yeti Homes! 🏠 - Thanks for Subscribing',
            html,
        });
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = EmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service.js.map