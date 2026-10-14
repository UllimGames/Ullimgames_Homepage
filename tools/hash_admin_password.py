"""Write js/admin-lock.js from the local .env password. Does not print the password."""
import hashlib
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ENV = ROOT / ".env"
LOCK = ROOT / "js" / "admin-lock.js"


def read_password():
    if not ENV.is_file():
        raise SystemExit("Missing .env")
    for line in ENV.read_text(encoding="utf-8").splitlines():
        stripped = line.strip()
        if not stripped or stripped.startswith("#") or "=" not in stripped:
            continue
        key, value = stripped.split("=", 1)
        if key.strip() == "ADMIN_PASSWORD":
            return value.strip().strip('"').strip("'")
    raise SystemExit("ADMIN_PASSWORD is missing")


def main():
    password = read_password()
    if len(password) < 4:
        raise SystemExit("Password must be at least 4 characters")
    digest = hashlib.sha256(password.encode("utf-8")).hexdigest()
    LOCK.write_text('window.UllimAdminLock = "%s";\n' % digest, encoding="utf-8")
    print("Wrote js/admin-lock.js")


if __name__ == "__main__":
    main()
