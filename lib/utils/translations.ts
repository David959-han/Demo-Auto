type Lang = 'uz' | 'en' | 'ar';

const serviceMap: Record<string, Record<Lang, string>> = {
  "Moy almashtirish + filtr":   { uz: "Moy almashtirish + filtr",   en: "Oil change + filter",          ar: "تغيير الزيت + الفلتر" },
  "Tormoz kolodka almashtirish":{ uz: "Tormoz kolodka almashtirish", en: "Brake pad replacement",        ar: "استبدال وسادات الفرامل" },
  "Dvigatel ta'miri":           { uz: "Dvigatel ta'miri",            en: "Engine repair",                ar: "إصلاح المحرك" },
  "Shina almashtirish":         { uz: "Shina almashtirish",          en: "Tire replacement",             ar: "استبدال الإطارات" },
  "Texnik ko'rik":              { uz: "Texnik ko'rik",               en: "Technical inspection",         ar: "الفحص الفني" },
  "Elektr tizimi ta'miri":      { uz: "Elektr tizimi ta'miri",       en: "Electrical system repair",    ar: "إصلاح النظام الكهربائي" },
  "Konditsioner ta'miri":       { uz: "Konditsioner ta'miri",        en: "AC repair",                    ar: "إصلاح مكيف الهواء" },
  "Transmissiya yog'i":         { uz: "Transmissiya yog'i",          en: "Transmission oil change",      ar: "تغيير زيت ناقل الحركة" },
  "Akkumulyator almashtirish":  { uz: "Akkumulyator almashtirish",   en: "Battery replacement",          ar: "استبدال البطارية" },
  "Karbyurator tozalash":       { uz: "Karbyurator tozalash",        en: "Carburetor cleaning",          ar: "تنظيف الكاربوريتور" },
  "Suv nasosi ta'miri":         { uz: "Suv nasosi ta'miri",          en: "Water pump repair",            ar: "إصلاح مضخة الماء" },
  "Mufta almashtirish":         { uz: "Mufta almashtirish",          en: "Clutch replacement",           ar: "استبدال القابض" },
  "Generator ta'miri":          { uz: "Generator ta'miri",           en: "Alternator repair",            ar: "إصلاح المولد" },
  "Amortizator almashtirish":   { uz: "Amortizator almashtirish",    en: "Shock absorber replacement",   ar: "استبدال ممتص الصدمات" },
  "Radiator yuvish":            { uz: "Radiator yuvish",             en: "Radiator flush",               ar: "غسيل المبرد" },
  "Yonilg'i nasosi ta'miri":    { uz: "Yonilg'i nasosi ta'miri",     en: "Fuel pump repair",             ar: "إصلاح مضخة الوقود" },
  "Termostot almashtirish":     { uz: "Termostot almashtirish",      en: "Thermostat replacement",       ar: "استبدال الثرموستات" },
  "V-kamar almashtirish":       { uz: "V-kamar almashtirish",        en: "Belt replacement",             ar: "استبدال السير" },
  "Elektr tizimi":              { uz: "Elektr tizimi",               en: "Electrical system",            ar: "النظام الكهربائي" },
  "Xavfsizlik tekshiruvi":      { uz: "Xavfsizlik tekshiruvi",       en: "Safety inspection",            ar: "فحص السلامة" },
  "Mijoz bekor qildi":          { uz: "Mijoz bekor qildi",           en: "Cancelled by customer",        ar: "ألغاه العميل" },
  "To'xtatgich ta'miri":        { uz: "To'xtatgich ta'miri",         en: "Brake caliper repair",         ar: "إصلاح مشبك الفرامل" },
};

const specialtyMap: Record<string, Record<Lang, string>> = {
  "Dvigatel":    { uz: "Dvigatel",    en: "Engine",        ar: "المحرك" },
  "Elektrik":    { uz: "Elektrik",    en: "Electrical",    ar: "كهربائي" },
  "Tormoz":      { uz: "Tormoz",      en: "Brakes",        ar: "الفرامل" },
  "Moy/filtr":   { uz: "Moy/filtr",   en: "Oil / Filter",  ar: "زيت / فلتر" },
  "Transmissiya":{ uz: "Transmissiya",en: "Transmission",  ar: "ناقل الحركة" },
  "Universal":   { uz: "Universal",   en: "All-round",     ar: "متعدد التخصصات" },
};

const partNameMap: Record<string, Record<Lang, string>> = {
  "Moy filtri":        { uz: "Moy filtri",        en: "Oil filter",      ar: "فلتر الزيت" },
  "Havo filtri":       { uz: "Havo filtri",        en: "Air filter",      ar: "فلتر الهواء" },
  "Tormoz kolodkasi":  { uz: "Tormoz kolodkasi",   en: "Brake pad",       ar: "وسادة الفرامل" },
  "Motor moyi 5W-30":  { uz: "Motor moyi 5W-30",   en: "Engine oil 5W-30",ar: "زيت المحرك 5W-30" },
  "Spark plug NGK":    { uz: "Spark plug NGK",      en: "Spark plug NGK",  ar: "شمعة الإشعال NGK" },
  "Akkumulyator 60Ah": { uz: "Akkumulyator 60Ah",  en: "Battery 60Ah",    ar: "بطارية 60Ah" },
  "V-kamar":           { uz: "V-kamar",             en: "Drive belt",      ar: "سير الإدارة" },
  "Tormoz diski":      { uz: "Tormoz diski",        en: "Brake disc",      ar: "قرص الفرامل" },
  "Salоn filtri":      { uz: "Salon filtri",        en: "Cabin filter",    ar: "فلتر المقصورة" },
  "Salon filtri":      { uz: "Salon filtri",        en: "Cabin filter",    ar: "فلتر المقصورة" },
  "Shamol qalqoni":    { uz: "Shamol qalqoni",      en: "Wind deflector",  ar: "حاجب الريح" },
};

const categoryMap: Record<string, Record<Lang, string>> = {
  "Filtr":   { uz: "Filtr",   en: "Filter",     ar: "فلتر" },
  "Tormoz":  { uz: "Tormoz",  en: "Brakes",     ar: "فرامل" },
  "Moy":     { uz: "Moy",     en: "Oil",        ar: "زيت" },
  "Elektrik":{ uz: "Elektrik",en: "Electrical", ar: "كهرباء" },
  "Motor":   { uz: "Motor",   en: "Engine",     ar: "محرك" },
  "Kuzov":   { uz: "Kuzov",   en: "Body",       ar: "هيكل" },
};

const colorMap: Record<string, Record<Lang, string>> = {
  "White":  { uz: "Oq",     en: "White",  ar: "أبيض" },
  "Silver": { uz: "Kumush", en: "Silver", ar: "فضي" },
  "Black":  { uz: "Qora",   en: "Black",  ar: "أسود" },
  "Blue":   { uz: "Ko'k",   en: "Blue",   ar: "أزرق" },
  "Red":    { uz: "Qizil",  en: "Red",    ar: "أحمر" },
  "Yellow": { uz: "Sariq",  en: "Yellow", ar: "أصفر" },
  "Gray":   { uz: "Kulrang",en: "Gray",   ar: "رمادي" },
};

function tr(map: Record<string, Record<Lang, string>>, key: string, lang: Lang): string {
  return map[key]?.[lang] ?? key;
}

export function trService(key: string, lang: string)   { return tr(serviceMap,   key, (lang as Lang) || 'uz'); }
export function trSpecialty(key: string, lang: string) { return tr(specialtyMap, key, (lang as Lang) || 'uz'); }
export function trPartName(key: string, lang: string)  { return tr(partNameMap,  key, (lang as Lang) || 'uz'); }
export function trCategory(key: string, lang: string)  { return tr(categoryMap,  key, (lang as Lang) || 'uz'); }
export function trColor(key: string, lang: string)     { return tr(colorMap,     key, (lang as Lang) || 'uz'); }
