'use client';
import { FC } from 'react';
import {
  InstagramIcon,
  LandingPhoneIcon,
  LinkedinIcon,
  VayuLandingIcon,
  XIcon,
} from '@packages/vayu-icons';
import { Button } from '@packages/vayu-ds';
import { useRouter } from 'next/navigation';

const LandingInfo: FC = () => {
  const handleLinkedin = () => {
    window.open(
      `https://www.linkedin.com/company/vayu-plan/`,
      `_blank`,
      `noopener,noreferrer`,
    );
  };

  const handleInstagram = () => {
    window.open(
      `https://www.instagram.com/vayu_plan?igsh=bHgzejBpMWwyZDRq`,
      `_blank`,
      `noopener,noreferrer`,
    );
  };

  return (
    <div className="w-full flex flex-col ">
      <div className=" w-full flex items-center py-4 justify-start gap-1  sm:gap-3 border-b border-b-1 border-b-white-100/30">
        <VayuLandingIcon />
        <span className="text-xs text-white-100 font-normal">آدرس:</span>
        <address className="text-white-100 font-semibold text-xs whitespace-pre-line  truncate">
          بلوار ارتش، خیابان ابوالفضل صمیع، مجتمع باغ بهشت، پلاک صفر، ساختمان
          هارد تک
        </address>
      </div>
      <div className="w-full py-4 flex items-center justify-start gap-6 pr-3 border-b border-b-1 border-b-white-100/30">
        <LandingPhoneIcon />
        <span className="text-white-100 font-semibold text-xs whitespace-nowrap truncate">
          <a href="tel:+9802128423236">۲۸۴۲ ۳۲۳۶</a>
        </span>
      </div>
      <div className="w-full items-center py-4 flex gap-1 pr-3  border-b-1 border-b-white-30">
        <Button onClick={handleLinkedin} variant="text" wSize="5xs" hSize="sm">
          <LinkedinIcon color="default" />
        </Button>
        <Button onClick={handleInstagram} variant="text" wSize="5xs" hSize="sm">
          <InstagramIcon color="default" />
        </Button>
      </div>
    </div>
  );
};
export default LandingInfo;
