//! dna-dom v3.3.3 ~~ https://dna-dom.org ~~ MIT License

export type Json = string | number | boolean | null | undefined | JsonObject | Json[];
export type JsonObject = {
    [key: string | number]: Json;
};
export type JsonData = JsonObject | Json[];
export type NavigatorUAData = {
    readonly brands: {
        brand: string;
        version: string;
    }[];
    readonly mobile: boolean;
    readonly platform: string;
};
export type DnaSettingsClone<T> = {
    callback: DnaCallbackFn<T> | null;
    clones: number;
    container: Element | null;
    empty: boolean;
    fade: boolean;
    formatter: DnaFormatter | null;
    holder: Element | null;
    html: boolean;
    top: boolean;
    transform: DnaTransformFn<T> | null;
};
export type DnaSettingsArrayPush = {
    fade: boolean;
    top: boolean;
};
export type DnaSettingsGetModel = {
    main: boolean;
};
export type DnaSettingsEmpty = {
    fade: boolean;
};
export type DnaSettingsRefresh = {
    data: unknown;
    html: boolean;
    main: boolean;
};
export type DnaSettingsRefreshAll = {
    data: unknown;
    html: boolean;
    main: boolean;
};
export type DnaSettingsRecount = {
    html: boolean;
};
export type DnaSettingsDestroy = {
    fade: boolean;
    main: boolean;
};
export type DnaSettingsGetClone = {
    main: boolean;
};
export type DnaSettingsGetIndex = {
    main: boolean;
};
export type DnaSettingsRegisterInitializer = {
    onDomReady: boolean;
    params: unknown[];
    selector: string | null;
};
export type DnaSettingsRunOnLoads = {
    pollInterval: number;
};
export type DnaSettingsEventsOn = {
    keyFilter: KeyboardEvent["key"] | null;
    selector: string | null;
    container: Element | null;
};
export type DnaSettingsPulse = {
    duration: number;
    durationIn: number;
    durationOut: number;
    noFadeOut: boolean;
    text: string | null;
};
export type DnaSettingsSmoothHeight = {
    container: Element;
    overflow: boolean;
    duration: number;
};
export type DnaDomCreateOptions = Partial<{
    id: string;
    subTags: (keyof HTMLElementTagNameMap)[];
    class: string;
    href: string;
    html: string;
    name: string;
    rel: string;
    src: string;
    style: Partial<CSSStyleDeclaration>;
    text: string;
    title: string;
    type: string;
}>;
export type DnaModel = JsonData;
export type DnaDataObject = JsonObject;
export type DnaFormatter = (value: DnaFormatterValue, model?: unknown) => string;
export type DnaFormatterValue = number | string | boolean;
export type DnaMsec = number | string;
export type DnaCallback = (...args: unknown[]) => unknown;
export interface DnaTransformFn<T> {
    (data: T): unknown;
}
export interface DnaCallbackFn<T> {
    (elem: Element, data?: T): unknown;
}
export interface DnaInitializerFn {
    (elem: Element, ...params: unknown[]): void;
}
export type DnaEventListener = (elem: Element, event: Event, selector: string | null) => void;
export type DnaInitializer = {
    fn: DnaFunctionName | DnaInitializerFn;
    selector: string | null;
    params: unknown[];
};
export type DnaTemplate = {
    name: string;
    elem: Element;
    container: Element;
    nested: boolean;
    separators: number;
    wrapped: boolean;
};
export type DnaTemplateDB = {
    [name: string]: DnaTemplate;
};
export type DnaTemplateName = string;
export type DnaCountsMap = {
    [name: string]: number;
};
export type DnaOnLoad = {
    start: number;
    checks: number;
    waiting?: number;
};
export type DnaContext = {
    [app: string]: {
        [field: string]: unknown;
    } | DnaCallback;
};
export type DnaFieldName = string;
export type DnaFunctionName = string;
export type DnaClassName = string;
export type DnaClassRule = [field: DnaFieldName, classTrue: DnaClassName, classFalse: DnaClassName];
export type DnaAttrName = string;
export type DnaAttrParts = [preText: string, field: DnaFieldName | 0 | 1 | 2, postText: string];
export type DnaAttrs = (DnaAttrName | DnaAttrParts)[];
export type DnaPropName = string;
export type DnaProps = string[];
export type DnaLoop = {
    name: string;
    field: DnaFieldName;
};
export type DnaRulesKey = keyof DnaRules;
export type DnaRulesValue = DnaRules[DnaRulesKey];
export type DnaRules = Partial<DnaRulesFields>;
export type DnaRulesFields = {
    template: DnaTemplateName;
    array: DnaFieldName;
    text: boolean;
    val: boolean;
    attrs: DnaAttrs;
    props: DnaProps;
    option: DnaFieldName;
    precision: number | null;
    formatter: DnaFormatter | null;
    transform: DnaFunctionName;
    callback: DnaFunctionName;
    class: DnaClassRule[];
    require: DnaFieldName;
    missing: DnaFieldName;
    true: DnaFieldName;
    false: DnaFieldName;
    loop: DnaLoop;
    subs: DnaFieldName[];
};
export type DnaInfo = {
    version: string;
    templates: number;
    clones: number;
    subs: number;
    names: string[];
    store: DnaTemplateDB;
    initializers: DnaInitializer[];
    panels: string[];
    state: unknown[];
};
export type DnaElems = Element[] | HTMLCollection | NodeListOf<Element>;
type GlobalWindow = Window & typeof globalThis;
type Dna = typeof dna;
declare global {
    var dna: Dna;
}
declare const dnaName: {
    animating: string;
    animatingDone: string;
    array: string;
    clone: string;
    container: string;
    displayed: string;
    executed: string;
    field: string;
    hidden: string;
    hide: string;
    initialized: string;
    lastSeparator: string;
    menu: string;
    menuItem: string;
    nucleotide: string;
    onLoad: string;
    panel: string;
    panels: string;
    panelsInitialized: string;
    selected: string;
    separator: string;
    subClone: string;
    template: string;
    unhide: string;
    unselected: string;
    updateModel: string;
};
declare const dna: {
    version: string;
    clone<M extends T | T[], T>(name: string, data: M, options?: Partial<DnaSettingsClone<T>>): M extends T[] ? HTMLElement[] : HTMLElement;
    arrayPush<T>(holderClone: Element, arrayField: string, data: T | T[], options?: Partial<DnaSettingsArrayPush>): Element;
    createTemplate(name: string, html: string, holder: Element): DnaTemplate;
    templateExists(name: string): boolean;
    getModel<T>(elem: Element, options?: Partial<DnaSettingsGetModel>): T | undefined;
    getModels<T>(template: string, options?: Partial<DnaSettingsGetModel>): T[];
    empty(name: string, options?: Partial<DnaSettingsEmpty>): Element[];
    insert<T>(name: string, data: T, options?: Partial<DnaSettingsClone<T>>): Element;
    refresh(clone: Element, options?: Partial<DnaSettingsRefresh>): Element;
    refreshAll(name: string, options?: Partial<DnaSettingsRefreshAll>): Element[];
    updateField(inputElem: Element, value: Json): Element;
    recount(elem: Element, options?: Partial<DnaSettingsRecount>): Element;
    destroy(elem: Element, options?: Partial<DnaSettingsDestroy>): Promise<Element>;
    isClone(elem: Element): boolean;
    getClone(elem: Element, options?: Partial<DnaSettingsGetClone>): Element;
    getClones(name: string): Element[];
    getIndex(elem: Element, options?: Partial<DnaSettingsGetIndex>): number;
    up(elemOrEvent: Element | Event): Promise<Element>;
    down(elemOrEvent: Element | Event): Promise<Element>;
    bye(elemOrEvent: Element | Event): Promise<Element>;
    registerInitializer(fn: DnaFunctionName | DnaInitializerFn, options?: Partial<DnaSettingsRegisterInitializer>): DnaInitializer[];
    clearInitializers(): DnaInitializer[];
    registerContext(contextName: string, contextObjOrFn: {
        [name: string]: unknown;
    } | DnaCallback): DnaContext;
    initGlobal(thisWindow: GlobalWindow): unknown;
    info(): DnaInfo;
    name: {
        animating: string;
        animatingDone: string;
        array: string;
        clone: string;
        container: string;
        displayed: string;
        executed: string;
        field: string;
        hidden: string;
        hide: string;
        initialized: string;
        lastSeparator: string;
        menu: string;
        menuItem: string;
        nucleotide: string;
        onLoad: string;
        panel: string;
        panels: string;
        panelsInitialized: string;
        selected: string;
        separator: string;
        subClone: string;
        template: string;
        unhide: string;
        unselected: string;
        updateModel: string;
    };
    selector: typeof dnaName;
    array: {
        find: <T>(array: T[], value: unknown, key?: string) => {
            index: number;
            item: T | null;
        };
        fromMap<E>(map: {
            [code: string | number]: E;
        }, options?: {
            key?: string;
            kebabCodes?: boolean;
        }): ((E & {
            [key: string]: string;
        }) | {
            [keyOrValue: string]: string | E;
        })[];
        toMap<E>(array: E[], options?: {
            key?: string;
            camelKeys?: boolean;
        }): {
            [code: string | number]: E;
        };
    };
    browser: {
        userAgentData(): NavigatorUAData;
    };
    pageToken: {
        put: (key: string, value: Json) => Json;
        get: (key: string, defaultValue: Json) => Json;
    };
    dom: {
        stateDepot: {
            [key: string | number | symbol]: unknown;
        }[];
        state(elem: Element): {
            [key: string]: unknown;
            [key: number]: unknown;
            [key: symbol]: unknown;
        };
        componentState(elem: Element): {
            [key: string]: unknown;
            [key: number]: unknown;
            [key: symbol]: unknown;
        };
        cloneState(clone: Element): Element;
        removeState(elem: Element): Element;
        createCustom(tag: string, options?: DnaDomCreateOptions): HTMLElement | HTMLCanvasElement | HTMLImageElement | HTMLVideoElement | HTMLAnchorElement | HTMLScriptElement | HTMLEmbedElement | HTMLFormElement | HTMLHeadElement | HTMLAreaElement | HTMLObjectElement | HTMLLinkElement | HTMLMapElement | HTMLInputElement | HTMLBaseElement | HTMLDataElement | HTMLTimeElement | HTMLProgressElement | HTMLTrackElement | HTMLSourceElement | HTMLButtonElement | HTMLAudioElement | HTMLQuoteElement | HTMLBodyElement | HTMLBRElement | HTMLTableCaptionElement | HTMLTableColElement | HTMLDataListElement | HTMLModElement | HTMLDetailsElement | HTMLDialogElement | HTMLDivElement | HTMLDListElement | HTMLFieldSetElement | HTMLHeadingElement | HTMLHRElement | HTMLHtmlElement | HTMLIFrameElement | HTMLLabelElement | HTMLLegendElement | HTMLLIElement | HTMLMenuElement | HTMLMetaElement | HTMLMeterElement | HTMLOListElement | HTMLOptGroupElement | HTMLOptionElement | HTMLOutputElement | HTMLParagraphElement | HTMLPictureElement | HTMLPreElement | HTMLSelectElement | HTMLSlotElement | HTMLSpanElement | HTMLStyleElement | HTMLTableElement | HTMLTableSectionElement | HTMLTableCellElement | HTMLTemplateElement | HTMLTextAreaElement | HTMLTitleElement | HTMLTableRowElement | HTMLUListElement;
        create<K extends keyof HTMLElementTagNameMap>(tag: K, options?: DnaDomCreateOptions): HTMLElementTagNameMap[K];
        hasClass(elems: DnaElems, className: string): boolean;
        toggleClass(elem: Element, className: string, state?: boolean): Element;
        replaceClass(elem: Element, oldName: string, newName: string): Element;
        addClass<T extends DnaElems>(elems: T, className: string): T;
        forEach<T extends HTMLCollection>(elems: T, fn: (elem: Element, index: number, elems: unknown[]) => unknown): T;
        map<T>(elems: DnaElems, fn: (elem: Element, index: number, elems: unknown[]) => T): T[];
        filter(elems: DnaElems, fn: (elem: Element, index: number, elems: unknown[]) => unknown): Element[];
        filterBySelector(elems: DnaElems, selector: string): Element[];
        filterByClass(elems: DnaElems, ...classNames: string[]): Element[];
        excludeByClass(elems: DnaElems, ...classNames: string[]): Element[];
        find(elems: DnaElems, fn: (elem: Element, index: number, elems: unknown[]) => boolean): Element | null;
        index(elem: Element): number;
        indexOf(elems: NodeListOf<Element>, elem: Element): number;
        findIndex(elems: HTMLCollection | NodeListOf<Element>, selector: string): number;
        insertAt<T extends Element>(container: Element, elem: T, index: number): T;
        isElem(elem: unknown): boolean;
        getAttrs(elem: Element): Attr[];
        toElem(elemOrEvent: Element | Event): HTMLElement;
        on(type: string, listener: DnaEventListener, options?: Partial<DnaSettingsEventsOn>): void;
        onClick(listener: DnaEventListener, selector?: string): void;
        onClickAddClass(selector: string, className: string): void;
        onChange(listener: DnaEventListener, selector?: string): void;
        onInput(listener: DnaEventListener, selector?: string): void;
        onKeyDown(listener: DnaEventListener, selector?: string): void;
        onKeyUp(listener: DnaEventListener, selector?: string): void;
        onEnterKey(listener: DnaEventListener, selector?: string): void;
        onFocusIn(listener: DnaEventListener, selector?: string): void;
        onFocusOut(listener: DnaEventListener, selector?: string): void;
        onCut(listener: DnaEventListener, selector?: string): void;
        onPaste(listener: DnaEventListener, selector?: string): void;
        onTouchStart(listener: DnaEventListener, selector?: string): void;
        onTouchEnd(listener: DnaEventListener, selector?: string): void;
        onSubmit(listener: DnaEventListener, selector?: string): void;
        onHoverIn(listener: DnaEventListener, selector: string): void;
        onHoverOut(listener: DnaEventListener, selector: string): void;
        onReady(callback: (...args: unknown[]) => unknown, options?: {
            quiet?: boolean;
        }): DocumentReadyState | "browserless";
        triggerChange(elem: Element, delay?: number): Event;
    };
    ui: {
        isHidden(elem: Element): boolean;
        isVisible(elem: Element): boolean;
        show(elem: Element): Element;
        hide(elem: Element): Element;
        toggle(elem: Element, display?: boolean): Element;
        fadeIn(elem: Element, options?: {
            duration?: number;
            reset?: boolean;
        }): Promise<Element>;
        fadeOut(elem: Element, options?: {
            duration?: number;
        }): Promise<Element>;
        slideFadeIn(elem: Element, options?: {
            duration?: number;
            reset?: boolean;
        }): Promise<Element>;
        slideFadeOut(elem: Element, options?: {
            duration?: number;
        }): Promise<Element>;
        slideFade(elem: Element, show: boolean): Promise<Element>;
        slideFadeDelete(elem: Element): Promise<Element>;
        smoothHeight(updateUI: () => unknown, options?: Partial<DnaSettingsSmoothHeight>): Promise<Element>;
        smoothMove(elem: Element, up: boolean): Promise<Element>;
        smoothMoveUp(elem: Element): Promise<Element>;
        smoothMoveDown(elem: Element): Promise<Element>;
        pulse(elem: Element, options?: Partial<DnaSettingsPulse>): Promise<Element>;
        focus(elem: Element, options?: {
            firstInput?: boolean;
        }): Element;
        setText(elem: Element | null, text: string): Element | null;
        toClone(elemOrEvent: Element | Event): Element;
        getComponent(elem: Element): Element | null;
    };
    util: {
        apply<T>(fn: string | DnaCallbackFn<T> | DnaInitializerFn, params: unknown[]): unknown;
        getFn(name: string): unknown;
        assign(data: DnaDataObject, field: string, value: Json): DnaDataObject;
        printf: (format: string, ...values: unknown[]) => string;
        round(value: number, precision: number): number;
        realTruth: (value: unknown) => boolean;
        toCamel: (kebabStr: string) => string;
        toKebab: (camelStr: string) => string;
        value(data: unknown, field: string | string[]): unknown;
        isObj(value: unknown): boolean;
        timestamp(date?: number): string;
        timestampMsec(date?: number): string;
    };
    format: {
        getCurrencyFormatter(iso4217: string, units?: number): DnaFormatter;
        getDateFormatter(format: string): DnaFormatter;
        getNumberFormatter(format: string): DnaFormatter;
        getPercentFormatter(format: string): DnaFormatter;
        getFormatter(fn: string): DnaFormatter;
    };
    placeholder: {
        setup(): NodeListOf<Element>;
    };
    panels: {
        display(menu: Element, location?: number, updateUrl?: boolean): Element;
        clickRotate(menuItem: Element): Element;
        selectRotate(menu: Element): Element;
        nextMenuNav: number;
        initialize(panels: Element | null): Element | null;
        setup(): NodeListOf<Element>;
    };
    compile: {
        getRules(elem: Element): DnaRules;
        setRule(rules: DnaRules, key: DnaRulesKey, value: DnaRulesValue): DnaRules;
        setElemRule(elem: Element, key: DnaRulesKey, value: DnaRulesValue): Element;
        regex: {
            dnaField: RegExp;
            dnaBasePair: RegExp;
            dnaBasePairs: RegExp;
        };
        setupNucleotide(elem: Element): Element;
        isDnaField(node: Element): boolean;
        addFieldClass(elem: Element): Element;
        field(elem: Element): Element;
        propsAndAttrs(elem: Element): Element;
        getDataField(elem: Element, type: DnaRulesKey): string;
        subTemplateName(holder: Element | string, arrayField: string, index: number): string;
        rules(elem: Element, type: DnaRulesKey, isLists?: boolean, className?: string, init?: (elem: Element) => void): Element;
        separators(elem: Element): Element;
        template(name: string): DnaTemplate;
    };
    template: {
        db: DnaTemplateDB;
        stash(elem: Element): DnaTemplate;
        get(name: string): DnaTemplate;
    };
    events: {
        db: {
            context: DnaContext;
            initializers: DnaInitializer[];
        };
        runOnLoads(options?: Partial<DnaSettingsRunOnLoads>): NodeListOf<Element>;
        runInitializers(root: Element): Element;
        setup: () => NodeListOf<Element>;
    };
    core: {
        inject<T>(clone: Element, data: T, index: number, options: Partial<DnaSettingsClone<T>>): Element;
        replicate<T>(template: DnaTemplate, data: T, settings: DnaSettingsClone<T>): Element;
        getArrayName(subClone: Element): string | null;
        updateModelArray(container: Element): Element;
        remove<T>(clone: Element, callback?: DnaCallbackFn<T> | null): Element;
        assert(ok: unknown, message: string, info: unknown): void;
        setup(): unknown;
    };
};
export { dna };
