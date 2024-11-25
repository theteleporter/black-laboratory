import React, { useRef } from 'react';
import { Copy, MoreHorizontal, ImageDown } from 'lucide-react';

interface InvoiceProps {
  sender: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    vatId: string;
  };
  recipient: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    vatId: string;
  };
  product: {
    name: string;
    quantity: number;
    price: number;
  };
  paymentInfo: {
    bank: string;
    accountNumber: string;
    swift: string;
    iban: string;
  };
  invoiceNumber: string;
  issueDate: string;
}

const defaultProps: InvoiceProps = {
  sender: {
    name: "Lost Island AB",
    email: "Pontus@lostisland.com",
    phone: "36182-4441",
    address: "Roslagsgatan 48",
    city: "211 34 Stockholm, Sweden",
    vatId: "SE124576767620"
  },
  recipient: {
    name: "Acme Inc",
    email: "John.doe@acme.com",
    phone: "36182-4441",
    address: "Street 56",
    city: "243 21 California, USA",
    vatId: "SE124576767620"
  },
  product: {
    name: "Product design",
    quantity: 125,
    price: 190
  },
  paymentInfo: {
    bank: "Mercury",
    accountNumber: "085629563",
    swift: "ESSESSE",
    iban: "051511313434613131"
  },
  invoiceNumber: "INV-01",
  issueDate: "08/12/2024"
};

const ImageIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
    <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
    <path d="M21 15L16 10L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19 21L14 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 21L12 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M14 19L10 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const PDFIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 21L12 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M14 19L10 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

function DownloadOptions({ invoiceRef }: { invoiceRef: React.RefObject<HTMLDivElement> }) {
  const handleDownloadImage = async () => {
    if (invoiceRef.current) {
      const canvas = await import('html2canvas').then(module => module.default(invoiceRef.current!));
      const image = canvas.toDataURL("image/png");
      const link = document.createElement('a');
      link.href = image;
      link.download = 'invoice.png';
      link.click();
    }
  };

  const handleDownloadPDF = async () => {
    if (invoiceRef.current) {
      const { default: html2canvas } = await import('html2canvas');
      const { default: jsPDF } = await import('jspdf');
      
      const canvas = await html2canvas(invoiceRef.current);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save("invoice.pdf");
    }
  };

  const handleCopy = async () => {
    if (invoiceRef.current) {
      const { default: html2canvas } = await import('html2canvas');
      const canvas = await html2canvas(invoiceRef.current);
      canvas.toBlob((blob) => {
        if (blob) {
          navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
        }
      });
    }
  };

  return (
    <div className="flex items-center justify-center space-x-1 sm:space-x-2 mt-4 bg-[#1c1c1c] p-1 sm:p-2 rounded-full w-auto mx-auto">
      <button
        onClick={handleCopy}
        className="p-1 sm:p-2 bg-[#333333] rounded-full hover:bg-[#444444] transition-colors"
        aria-label="Copy invoice"
      >
        <Copy size={14} className="sm:w-5 sm:h-5" />
      </button>
      <button
        onClick={handleDownloadImage}
        className="p-1 sm:p-2 bg-[#333333] rounded-full hover:bg-[#444444] transition-colors"
        aria-label="Download as image"
      >
        <ImageDown size={14} className="sm:w-5 sm:h-5" />
      </button>
      <button
        onClick={handleDownloadPDF}
        className="p-1 sm:p-2 bg-[#333333] rounded-full hover:bg-[#444444] transition-colors"
        aria-label="Download as PDF"
      >
        <PDFIcon />
      </button>
      <button
        className="p-1 sm:p-2 bg-[#333333] rounded-full hover:bg-[#444444] transition-colors"
        aria-label="More options"
      >
        <MoreHorizontal size={14} className="sm:w-5 sm:h-5" />
      </button>
    </div>
  );
}

export default function Component(props: Partial<InvoiceProps> = {}) {
  const { sender, recipient, product, paymentInfo, invoiceNumber, issueDate } = { ...defaultProps, ...props };
  const total = product.quantity * product.price;
  const invoiceRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-[#0a0a0a] min-h-screen flex flex-col items-center justify-center p-4">
      <div ref={invoiceRef} className="bg-[#1c1c1c] text-[#a0a0a0] p-4 sm:p-6 md:p-8 font-mono w-full max-w-2xl mx-auto text-xs sm:text-sm mb-4">
        <div className="border border-[#333333] p-4 sm:p-6 md:p-8">
          <div className="flex flex-col sm:flex-row justify-between mb-8 sm:mb-12">
            <div className="mb-4 sm:mb-0">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#333333] mb-4"></div>
              <h2 className="text-base sm:text-lg font-bold mb-2">{sender.name}</h2>
              <p>{sender.email}</p>
              <p>{sender.phone}</p>
              <p>{sender.address}</p>
              <p>{sender.city}</p>
              <p>VAT ID: {sender.vatId}</p>
            </div>
            <div className="text-left sm:text-right">
              <h2 className="text-base sm:text-lg font-bold mb-2">{recipient.name}</h2>
              <p>{recipient.email}</p>
              <p>{recipient.phone}</p>
              <p>{recipient.address}</p>
              <p>{recipient.city}</p>
              <p>VAT ID: {recipient.vatId}</p>
            </div>
          </div>

          <table className="w-full mb-8 sm:mb-12">
            <thead>
              <tr className="border-b border-[#333333]">
                <th className="text-left py-2 font-normal">Product</th>
                <th className="text-right py-2 font-normal">Quantity</th>
                <th className="text-right py-2 font-normal">Price</th>
                <th className="text-right py-2 font-normal">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2">{product.name}</td>
                <td className="text-right py-2">{product.quantity} units</td>
                <td className="text-right py-2">€{product.price}</td>
                <td className="text-right py-2">€{total}</td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-between mb-8 sm:mb-12">
            <div></div>
            <div className="text-right">
              <p className="mb-2">Subtotal: €{total}</p>
              <p className="text-xl sm:text-2xl font-bold text-white">Total: €{total.toFixed(2)}</p>
            </div>
          </div>

          <div className="mb-8 sm:mb-12">
            <h3 className="text-xs sm:text-sm font-bold mb-2">Payment information</h3>
            <p>Bank: {paymentInfo.bank}  Account number: {paymentInfo.accountNumber}</p>
            <p>Swift (bic): {paymentInfo.swift}  Iban: {paymentInfo.iban}</p>
          </div>

          <div className="flex justify-between text-xs">
            <p>Invoice NO: {invoiceNumber}</p>
            <p>Issue date: {issueDate}</p>
          </div>
        </div>
      </div>
      <DownloadOptions invoiceRef={invoiceRef} />
    </div>
  );
}
