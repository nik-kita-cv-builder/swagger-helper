import {
  computed,
  createElementBlock,
  defineComponent,
  inject,
  normalizeStyle,
  onMounted,
  onUnmounted,
  openBlock,
  readonly,
  ref,
  unref,
  watch,
  watchEffect,
} from "./chunk-VEAONSOE.js";

// node_modules/.deno/vue3-google-signin@1.3.5/node_modules/vue3-google-signin/dist/index.es.js
var v = Symbol();
var U = ref(false);
var C = ref(false);
var B = ref(false);
var T = ref(0);
var k = null;
var te = () => {
  const e = document.createElement("script");
  return e.src = "https://accounts.google.com/gsi/client",
    e.async = true,
    e.defer = true,
    e;
};
var ne = () => {
  C.value = true,
    k = te(),
    document.head.appendChild(k),
    k.onload = () => {
      C.value = false, U.value = true;
    },
    k.onerror = () => {
      C.value = false, B.value = true;
    };
};
watch(
  () => T.value,
  (e, o) => {
    e > 0 && !U.value && !C.value && ne();
  },
);
function A() {
  return onMounted(() => {
    T.value++;
  }),
    onUnmounted(() => {
      T.value--;
    }),
    {
      scriptLoaded: readonly(U),
      scriptLoadError: readonly(B),
    };
}
var oe = defineComponent({
  __name: "GoogleSignInButton",
  props: {
    oneTap: { type: Boolean },
    autoSelect: { type: Boolean },
    loginUri: {},
    cancelOnTapOutside: { type: Boolean },
    promptParentId: {},
    nonce: {},
    context: {},
    stateCookieDomain: {},
    uxMode: {},
    allowedParentOrigin: {},
    itpSupport: { type: Boolean },
    type: {},
    theme: {},
    size: {},
    text: {},
    shape: {},
    logoAlignment: {},
    width: {},
    locale: {},
  },
  emits: [
    "success",
    "error",
    "intermediateIframeCloseCallback",
    "nativeCallback",
    "promptMomentNotification",
  ],
  setup(e, { emit: o }) {
    const n = { large: 40, medium: 32, small: 20 },
      t = e,
      i = o,
      r = inject(v),
      s = ref(null),
      { scriptLoaded: d } = A();
    watchEffect(() => {
      var a, p, f, g;
      d.value && ((a = window.google) == null || a.accounts.id.initialize({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        client_id: r,
        callback: (c) => {
          if (!c.clientId || !c.credential) {
            i("error");
            return;
          }
          i("success", c);
        },
        allowed_parent_origin: t.allowedParentOrigin,
        auto_select: t.autoSelect,
        cancel_on_tap_outside: t.cancelOnTapOutside,
        context: t.context,
        intermediate_iframe_close_callback: () => {
          i("intermediateIframeCloseCallback");
        },
        itp_support: t.itpSupport,
        login_uri: t.loginUri,
        native_callback: (c) => {
          i("nativeCallback", c);
        },
        nonce: t.nonce,
        prompt_parent_id: t.promptParentId,
        state_cookie_domain: t.stateCookieDomain,
        ux_mode: t.uxMode,
      }),
        (f = window.google) == null || f.accounts.id.renderButton(s.value, {
          type: t.type,
          theme: t.theme,
          size: t.size,
          text: t.text,
          shape: t.shape,
          logo_alignment: t.logoAlignment,
          width: (p = t.width) == null ? void 0 : p.toString(),
          locale: t.locale,
        }),
        t.oneTap &&
        ((g = window.google) == null || g.accounts.id.prompt((c) => {
          i("promptMomentNotification", c);
        })));
    }),
      onUnmounted(() => {
        var a;
        t.oneTap && ((a = window.google) == null || a.accounts.id.cancel());
      });
    const u = computed(() => n[t.size || "large"]);
    return (a, p) => (openBlock(),
      createElementBlock(
        "div",
        {
          ref_key: "targetElement",
          ref: s,
          style: normalizeStyle({ display: "inline-flex", height: u.value }),
        },
        null,
        4,
      ));
  },
});
function le(e, o, ...n) {
  var t;
  return ((t = window.google) == null
    ? void 0
    : t.accounts.oauth2.hasGrantedAllScopes(
      e,
      o,
      ...n,
    )) || false;
}
function re(e, o, ...n) {
  var t;
  return ((t = window.google) == null
    ? void 0
    : t.accounts.oauth2.hasGrantedAnyScope(
      e,
      o,
      ...n,
    )) || false;
}
function se(e, o) {
  var n;
  (n = window.google) == null || n.accounts.oauth2.revoke(e, () => {
    o == null || o();
  });
}
function ie(e) {
  const o = "https://accounts.google.com/o/oauth2/v2/auth",
    n = new URLSearchParams({
      gsiwebsdk: "3",
      client_id: e.client_id,
      scope: e.scope,
      include_granted_scopes: "true",
      access_type: "offline",
      response_type: "code",
      prompt: "consent",
    });
  return e.hint && n.append("hint", e.hint),
    e.hosted_domain && n.append("hosted_domain", e.hosted_domain),
    e.redirect_uri === void 0
      ? n.append("redirect_uri", window.origin)
      : n.append("redirect_uri", e.redirect_uri),
    e.select_account === void 0
      ? n.append("select_account", "false")
      : n.append("select_account", `${e.select_account}`),
    e.enable_serial_consent === void 0
      ? n.append("enable_serial_consent", "false")
      : n.append(
        "enable_serial_consent",
        `${e.enable_serial_consent}`,
      ),
    e.state && n.append("state", e.state),
    `${o}?${n.toString()}`;
}
function de(e = {}) {
  const { scope: o = "", onError: n, onSuccess: t, ...i } = e,
    { scriptLoaded: r } = A(),
    s = inject(v),
    d = ref(false),
    u = ref(null);
  let a;
  return watchEffect(() => {
    var c;
    if (d.value = false, !r.value) {
      return;
    }
    const p = unref(o),
      g = `openid email profile ${Array.isArray(p) ? p.join(" ") : p}`;
    u.value = ie({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      client_id: s,
      scope: g,
      ...i,
    }),
      a = (c = window.google) == null
        ? void 0
        : c.accounts.oauth2.initCodeClient({
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          client_id: s,
          scope: g,
          callback: (h) => {
            if (h.error) {
              return n == null ? void 0 : n(h);
            }
            t == null || t(h);
          },
          ...i,
        }),
      d.value = true;
  }),
    {
      isReady: readonly(d),
      login: () => a == null ? void 0 : a.requestCode(),
      codeRequestRedirectUrl: readonly(u),
    };
}
function ue(e) {
  const {
      disableAutomaticPrompt: o = false,
      onSuccess: n,
      onError: t,
      onPromptMomentNotification: i,
      onNativeCallback: r,
      onIntermediateIframeCloseCallback: s,
      autoSelect: d,
      loginUri: u,
      cancelOnTapOutside: a,
      promptParentId: p,
      nonce: f,
      context: g,
      stateCookieDomain: c,
      allowedParentOrigin: h,
      itpSupport: L,
    } = e || {},
    { scriptLoaded: P } = A(),
    $ = inject(v),
    y = ref(false),
    q = () => {
      var b;
      return y.value &&
        ((b = window.google) == null ? void 0 : b.accounts.id.prompt(
          (x) => i == null ? void 0 : i(x),
        ));
    };
  return watchEffect((b) => {
    var G, O;
    if (y.value = false, !P.value) {
      return;
    }
    const x = !unref(o),
      E = unref(d),
      j = unref(u),
      V = unref(p),
      D = unref(f),
      M = unref(g),
      H = unref(c),
      J = unref(h),
      K = unref(L),
      N = unref(a);
    (G = window.google) == null || G.accounts.id.initialize({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      client_id: $,
      callback: (_) => {
        if (!_.clientId || !_.credential) {
          t == null || t();
          return;
        }
        n == null || n(_);
      },
      native_callback: (_) => {
        r == null || r(_);
      },
      intermediate_iframe_close_callback: () => {
        s == null || s();
      },
      auto_select: E,
      allowed_parent_origin: J,
      context: M,
      itp_support: K,
      login_uri: j,
      nonce: D,
      prompt_parent_id: V,
      state_cookie_domain: H,
      cancel_on_tap_outside: N,
    }),
      y.value = true,
      x && ((O = window.google) == null || O.accounts.id.prompt(
        (_) => i == null ? void 0 : i(_),
      )),
      b(() => {
        var _;
        (_ = window.google) == null || _.accounts.id.cancel();
      });
  }),
    { isReady: readonly(y), login: q };
}
function pe(e = {}) {
  const { scope: o = "", onError: n, onSuccess: t, ...i } = e,
    { scriptLoaded: r } = A(),
    s = inject(v),
    d = ref(false);
  let u;
  return watchEffect(() => {
    var f;
    if (d.value = false, !r.value) {
      return;
    }
    const a = unref(o), p = Array.isArray(a) ? a.join(" ") : a;
    u = (f = window.google) == null
      ? void 0
      : f.accounts.oauth2.initTokenClient({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        client_id: s,
        scope: `openid email profile ${p}`,
        callback: (g) => {
          if (g.error) {
            return n == null ? void 0 : n(g);
          }
          t == null || t(g);
        },
        ...i,
      }), d.value = true;
  }),
    {
      isReady: readonly(d),
      login: (a) => u == null ? void 0 : u.requestAccessToken(a),
    };
}
function ge(e, o) {
  var n;
  (n = window.google) == null || n.accounts.id.revoke(e, (t) => {
    o == null || o(t);
  });
}
function _e(e) {
  const n = e.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"),
    t = decodeURIComponent(
      window.atob(n).split("").map((r) =>
        `%${("00" + r.charCodeAt(0).toString(16)).slice(-2)}`
      ).join(""),
    ),
    i = JSON.parse(t);
  return {
    email: i.email,
    email_verified: i.email_verified,
    hd: i.hd,
    family_name: i.family_name,
    given_name: i.given_name,
    name: i.name,
    picture: i.picture,
    id: i.sub,
  };
}
var ae = "GoogleSignInPlugin";
var R = (e) => `[${ae}]: ${e}`;
var me = {
  install(e, o) {
    if (!o) {
      throw new Error(
        R("initialize plugin by passing an options object"),
      );
    }
    if (!o.clientId || o.clientId && o.clientId.trim().length === 0) {
      throw new Error(R("clientId is required to initialize"));
    }
    e.provide(v, o.clientId), e.component("GoogleSignInButton", oe);
  },
};
export {
  _e as decodeCredential,
  A as useGsiScript,
  ae as PLUGIN_NAME,
  de as useCodeClient,
  ge as idRevoke,
  ie as buildCodeRequestRedirectUrl,
  le as hasGrantedAllScopes,
  me as default,
  oe as GoogleSignInButton,
  pe as useTokenClient,
  re as hasGrantedAnyScopes,
  se as revokeAccessToken,
  ue as useOneTap,
};
//# sourceMappingURL=vue3-google-signin.js.map
