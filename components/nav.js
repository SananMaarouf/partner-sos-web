import React from 'react';
import Link from 'next/link';

export default function Nav() {
    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">PartnerSOS</span>
                </Link>
            </div>
        </nav>

    );
};
