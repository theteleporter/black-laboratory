'use client';

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

const DownloadOptions = ({ invoiceRef }: { invoiceRef: React.RefObject<HTMLDivElement> }) => {
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
    <div className="flex items-center justify-center space-x-2 mt-4">
      <button
        onClick={handleCopy}
        className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition"
        aria-label="Copy invoice"
      >
        <Copy size={18} />
      </button>
      <button
        onClick={handleDownloadImage}
        className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition"
        aria-label="Download as image"
      >
        <ImageDown size={18} />
      </button>
      <button
        onClick={handleDownloadPDF}
        className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition"
        aria-label="Download as PDF"
      >
        <MoreHorizontal size={18} />
      </button>
    </div>
  );
};

export default function Component(props: Partial<InvoiceProps> = {}) {
  const { sender, recipient, product, paymentInfo, invoiceNumber, issueDate } = {
    ...defaultProps,
    ...props,
  };
  const total = product.quantity * product.price;
  const invoiceRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-black min-h-screen p-4">
      <div
        ref={invoiceRef}
        className="bg-gray-900 text-gray-200 max-w-3xl mx-auto p-6 rounded-lg shadow-lg"
      >
        <div className="flex justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold">{sender.name}</h2>
            <p>{sender.email}</p>
            <p>{sender.phone}</p>
            <p>{sender.address}</p>
            <p>{sender.city}</p>
          </div>
          <div className="text-right">
            <h2 className="text-lg font-bold">{recipient.name}</h2>
            <p>{recipient.email}</p>
            <p>{recipient.phone}</p>
            <p>{recipient.address}</p>
            <p>{recipient.city}</p>
          </div>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left">Product</th>
              <th className="text-right">Quantity</th>
              <th className="text-right">Price</th>
              <th className="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{product.name}</td>
              <td className="text-right">{product.quantity}</td>
              <td className="text-right">€{product.price}</td>
              <td className="text-right">€{total}</td>
            </tr>
          </tbody>
        </table>

        <div className="mt-6 text-right">
          <p className="font-bold">Total: €{total}</p>
        </div>
      </div>

      <DownloadOptions invoiceRef={invoiceRef} />
    </div>
  );
}
