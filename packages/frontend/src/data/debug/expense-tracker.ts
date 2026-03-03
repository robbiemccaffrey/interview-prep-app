import type { DebugExercise } from './types';

export const expenseTrackerExercises: DebugExercise[] = [
  // -----------------------------------------------------------------------
  // Bug 1 — Tags Leak Between Expenses
  // -----------------------------------------------------------------------
  {
    id: 'expense-tracker-1',
    project: 'expense-tracker',
    projectLabel: 'Expense Tracker',
    bugNumber: 1,
    title: 'Tags Leak Between Expenses',
    difficulty: 'medium',
    category: 'mutable-default',
    language: 'python',
    symptom: `### Symptom

Creating multiple expenses without specifying tags causes them to **share the same tag list**. Adding a tag to one expense makes it appear on all previously-created expenses too.

\`\`\`python
e1 = Expense(10.0, "food", "Lunch", date(2024, 1, 1))
e2 = Expense(20.0, "food", "Dinner", date(2024, 1, 1))
e1.tags.append("work")
print(e2.tags)  # ['work'] — but we never tagged e2!
\`\`\`

### What you know

The \`Expense\` class has an optional \`tags\` parameter. When you create two expenses without passing \`tags\`, then append a tag to the first, the second expense also shows that tag.`,
    hints: [
      'Look at the default value for the `tags` parameter in `__init__`.',
      'In Python, a mutable default argument like `tags: list = []` is created once when the class is defined. Every call that omits `tags` shares the **same list object**.',
      'Use `None` as the default and create a new list inside the method: `self.tags = tags if tags is not None else []`.',
    ],
    files: [
      {
        filename: 'models.py',
        language: 'python',
        buggyCode: `"""Domain models for the expense tracker."""
from datetime import date, datetime


class Expense:
    """A single expense entry."""

    def __init__(
        self,
        amount: float,
        category: str,
        description: str,
        expense_date: date,
        tags: list = [],
        metadata: dict = None,
    ):
        self.amount = amount
        self.category = category
        self.description = description
        self.expense_date = expense_date
        self.tags = tags
        self.metadata = metadata if metadata is not None else {}

    def __repr__(self):
        return f"Expense(amount={self.amount}, category={self.category!r}, tags={self.tags})"`,
        solutionCode: `"""Domain models for the expense tracker."""
from datetime import date, datetime


class Expense:
    """A single expense entry."""

    def __init__(
        self,
        amount: float,
        category: str,
        description: str,
        expense_date: date,
        tags: list = None,
        metadata: dict = None,
    ):
        self.amount = amount
        self.category = category
        self.description = description
        self.expense_date = expense_date
        self.tags = tags if tags is not None else []
        self.metadata = metadata if metadata is not None else {}

    def __repr__(self):
        return f"Expense(amount={self.amount}, category={self.category!r}, tags={self.tags})"`,
      },
    ],
    testFiles: [
      {
        filename: 'test_models.py',
        language: 'python',
        code: `from datetime import date

# Expense class is defined in the source file above

def run_tests():
    passed = 0
    failed = 0

    # Test 1: Two expenses without tags should have independent tag lists
    e1 = Expense(10.0, "food", "Lunch", date(2024, 1, 1))
    e2 = Expense(20.0, "food", "Dinner", date(2024, 1, 1))
    e1.tags.append("work")
    if "work" not in e2.tags:
        print("[PASS] Tags from e1 do not leak into e2")
        passed += 1
    else:
        print(f"[FAIL] Tags leaked: e2.tags = {e2.tags}, expected []")
        failed += 1

    # Test 2: Third expense created later also starts clean
    e3 = Expense(30.0, "transport", "Bus", date(2024, 1, 2))
    if "work" not in e3.tags:
        print("[PASS] Third expense is not affected by first expense's tags")
        passed += 1
    else:
        print(f"[FAIL] Third expense picked up leaked tags: {e3.tags}")
        failed += 1

    # Test 3: Explicit tags should be preserved
    e4 = Expense(40.0, "food", "Brunch", date(2024, 1, 3), tags=["business"])
    if e4.tags == ["business"]:
        print("[PASS] Explicit tags are preserved")
        passed += 1
    else:
        print(f"[FAIL] Explicit tags lost: expected ['business'], got {e4.tags}")
        failed += 1

    # Test 4: Modifying tags on one expense does not affect another
    e5 = Expense(15.0, "food", "Snack", date(2024, 1, 4))
    e6 = Expense(25.0, "food", "Coffee", date(2024, 1, 4))
    e5.tags.append("personal")
    e6.tags.append("shared")
    if e5.tags == ["personal"] and e6.tags == ["shared"]:
        print("[PASS] Each expense has its own independent tag list")
        passed += 1
    else:
        print(f"[FAIL] Tags mixed up: e5.tags={e5.tags}, e6.tags={e6.tags}")
        failed += 1

    # Test 5: Empty tags list is a distinct object for each instance
    e7 = Expense(10.0, "food", "A", date(2024, 1, 5))
    e8 = Expense(10.0, "food", "B", date(2024, 1, 5))
    if e7.tags is not e8.tags:
        print("[PASS] Tag lists are distinct objects")
        passed += 1
    else:
        print("[FAIL] Tag lists are the same object (shared reference)")
        failed += 1

    print(f"\\n{passed + failed} tests: {passed} passed, {failed} failed")

run_tests()`,
      },
    ],
    solutionExplanation: `### Root Cause

The \`__init__\` method uses a mutable default argument:

\`\`\`python
def __init__(self, ..., tags: list = [], ...):
    self.tags = tags
\`\`\`

In Python, default argument values are evaluated **once** when the function is defined, not each time it is called. So \`tags=[]\` creates a single list object that is shared by every call that doesn't pass \`tags\`. Mutating one expense's tags mutates the shared list.

### Fix

Use \`None\` as the default and create a fresh list inside the method:

\`\`\`python
def __init__(self, ..., tags: list = None, ...):
    self.tags = tags if tags is not None else []
\`\`\``,
  },

  // -----------------------------------------------------------------------
  // Bug 2 — Duplicating an Expense Shares Metadata
  // -----------------------------------------------------------------------
  {
    id: 'expense-tracker-2',
    project: 'expense-tracker',
    projectLabel: 'Expense Tracker',
    bugNumber: 2,
    title: 'Duplicating an Expense Shares Metadata',
    difficulty: 'medium',
    category: 'shallow-copy',
    language: 'python',
    symptom: `### Symptom

After duplicating an expense, modifying the metadata on the duplicate also changes the original's metadata.

\`\`\`python
original = Expense(50.0, "food", "Dinner", date(2024, 1, 1),
                   metadata={"receipt": "img001.jpg"})
dup = original.duplicate()
dup.metadata["receipt"] = "img999.jpg"
print(original.metadata["receipt"])  # "img999.jpg" — original changed!
\`\`\`

### What you know

The \`duplicate()\` method should create a fully independent copy with a new ID and timestamp. The duplicate should not share any mutable state with the original.`,
    hints: [
      'Look at what kind of copy `duplicate()` uses. Is it a shallow copy or a deep copy?',
      '`copy.copy()` does a shallow copy -- it creates a new top-level `Expense` object, but nested mutable objects like `self.metadata` (a dict) are still shared references.',
      'Replace `copy.copy(self)` with `copy.deepcopy(self)` to recursively copy all nested objects.',
    ],
    files: [
      {
        filename: 'models.py',
        language: 'python',
        buggyCode: `"""Domain models for the expense tracker."""
import copy
import uuid
from datetime import date, datetime


class Expense:
    """A single expense entry."""

    def __init__(
        self,
        amount: float,
        category: str,
        description: str,
        expense_date: date,
        id: str = None,
        metadata: dict = None,
        tags: list = None,
    ):
        self.id = id or str(uuid.uuid4())[:8]
        self.amount = amount
        self.category = category
        self.description = description
        self.expense_date = expense_date
        self.metadata = metadata if metadata is not None else {}
        self.tags = tags if tags is not None else []

    def __repr__(self):
        return f"Expense(id={self.id!r}, amount={self.amount}, category={self.category!r})"

    def duplicate(self):
        """Create a copy of this expense with a new ID."""
        new_expense = copy.copy(self)
        new_expense.id = str(uuid.uuid4())[:8]
        new_expense.created_at = datetime.now()
        return new_expense`,
        solutionCode: `"""Domain models for the expense tracker."""
import copy
import uuid
from datetime import date, datetime


class Expense:
    """A single expense entry."""

    def __init__(
        self,
        amount: float,
        category: str,
        description: str,
        expense_date: date,
        id: str = None,
        metadata: dict = None,
        tags: list = None,
    ):
        self.id = id or str(uuid.uuid4())[:8]
        self.amount = amount
        self.category = category
        self.description = description
        self.expense_date = expense_date
        self.metadata = metadata if metadata is not None else {}
        self.tags = tags if tags is not None else []

    def __repr__(self):
        return f"Expense(id={self.id!r}, amount={self.amount}, category={self.category!r})"

    def duplicate(self):
        """Create a copy of this expense with a new ID."""
        new_expense = copy.deepcopy(self)
        new_expense.id = str(uuid.uuid4())[:8]
        new_expense.created_at = datetime.now()
        return new_expense`,
      },
    ],
    testFiles: [
      {
        filename: 'test_models.py',
        language: 'python',
        code: `import copy
import uuid
from datetime import date, datetime

# Expense class is defined in the source file above

def run_tests():
    passed = 0
    failed = 0

    # Test 1: Duplicate metadata is independent from original
    original = Expense(50.0, "food", "Dinner", date(2024, 1, 1),
                       metadata={"receipt": "img001.jpg"})
    dup = original.duplicate()
    dup.metadata["receipt"] = "img999.jpg"
    if original.metadata["receipt"] == "img001.jpg":
        print("[PASS] Modifying duplicate metadata does not affect original")
        passed += 1
    else:
        print(f"[FAIL] Original metadata changed: {original.metadata['receipt']}")
        failed += 1

    # Test 2: Duplicate has a different ID
    original2 = Expense(30.0, "transport", "Taxi", date(2024, 1, 2))
    dup2 = original2.duplicate()
    if dup2.id != original2.id:
        print("[PASS] Duplicate has a new ID")
        passed += 1
    else:
        print(f"[FAIL] Duplicate has same ID as original: {dup2.id}")
        failed += 1

    # Test 3: Duplicate preserves amount and category
    if dup2.amount == 30.0 and dup2.category == "transport":
        print("[PASS] Duplicate preserves amount and category")
        passed += 1
    else:
        print(f"[FAIL] Duplicate data mismatch: amount={dup2.amount}, category={dup2.category}")
        failed += 1

    # Test 4: Adding to duplicate metadata does not affect original
    original3 = Expense(100.0, "travel", "Flight", date(2024, 3, 1),
                        metadata={"airline": "Ryanair"})
    dup3 = original3.duplicate()
    dup3.metadata["seat"] = "12A"
    if "seat" not in original3.metadata:
        print("[PASS] New key in duplicate metadata does not appear in original")
        passed += 1
    else:
        print(f"[FAIL] Original metadata gained new key: {original3.metadata}")
        failed += 1

    # Test 5: Duplicate tags are independent
    original4 = Expense(20.0, "food", "Lunch", date(2024, 1, 5),
                        tags=["work"])
    dup4 = original4.duplicate()
    dup4.tags.append("expensed")
    if original4.tags == ["work"]:
        print("[PASS] Duplicate tags are independent from original")
        passed += 1
    else:
        print(f"[FAIL] Original tags changed: {original4.tags}")
        failed += 1

    print(f"\\n{passed + failed} tests: {passed} passed, {failed} failed")

run_tests()`,
      },
    ],
    solutionExplanation: `### Root Cause

The \`duplicate()\` method uses \`copy.copy()\` (shallow copy):

\`\`\`python
new_expense = copy.copy(self)
\`\`\`

A shallow copy creates a new \`Expense\` object, but nested mutable objects like \`self.metadata\` (a dict) and \`self.tags\` (a list) are **not** copied -- both the original and the duplicate point to the **same** dict/list in memory. Mutating one mutates the other.

### Fix

Use \`copy.deepcopy()\` to recursively copy all nested objects:

\`\`\`python
new_expense = copy.deepcopy(self)
\`\`\``,
  },

  // -----------------------------------------------------------------------
  // Bug 3 — CSV Import Amounts Are Not Numbers
  // -----------------------------------------------------------------------
  {
    id: 'expense-tracker-3',
    project: 'expense-tracker',
    projectLabel: 'Expense Tracker',
    bugNumber: 3,
    title: 'CSV Import Amounts Are Not Numbers',
    difficulty: 'easy',
    category: 'type-coercion',
    language: 'python',
    symptom: `### Symptom

After importing expenses from CSV data, arithmetic operations on amounts fail or produce wrong results. Summing expenses concatenates strings like \`"45.50120.009.99"\` instead of returning \`175.49\`. Filtering by minimum amount may also crash with a \`TypeError\`.

### What you know

The CSV import function receives rows as dicts (like \`csv.DictReader\` output) where **all values are strings**. After import, the expenses appear to load correctly, but their \`amount\` fields behave like strings instead of numbers.`,
    hints: [
      'What type does `csv.DictReader` return for each field value?',
      '`csv.DictReader` returns **all** values as strings, regardless of what they look like. `row["amount"]` is `"45.50"`, not `45.50`.',
      'Wrap the amount with `float()`: `amount=float(row["amount"])`.',
    ],
    files: [
      {
        filename: 'csv_io.py',
        language: 'python',
        buggyCode: `"""CSV import functionality."""
from datetime import date


class Expense:
    """A single expense entry."""
    def __init__(self, amount, category: str, description: str,
                 expense_date: date, tags: list = None):
        self.amount = amount
        self.category = category
        self.description = description
        self.expense_date = expense_date
        self.tags = tags if tags is not None else []

    def __repr__(self):
        return f"Expense(amount={self.amount!r}, category={self.category!r})"


def import_from_csv_data(rows):
    """Import expenses from CSV-like row dicts.

    In a real app this reads from csv.DictReader which returns all values as strings.
    Expected keys: amount, category, description, date, tags
    """
    expenses = []
    for row in rows:
        tags = (
            [t.strip() for t in row.get("tags", "").split(";") if t.strip()]
            if row.get("tags")
            else []
        )
        expenses.append(
            Expense(
                amount=row["amount"],
                category=row["category"],
                description=row["description"],
                expense_date=date.fromisoformat(row["date"]),
                tags=tags,
            )
        )
    return expenses


def filter_by_min_amount(expenses, min_amount):
    """Filter expenses at or above a minimum amount."""
    return [e for e in expenses if e.amount >= min_amount]`,
        solutionCode: `"""CSV import functionality."""
from datetime import date


class Expense:
    """A single expense entry."""
    def __init__(self, amount, category: str, description: str,
                 expense_date: date, tags: list = None):
        self.amount = amount
        self.category = category
        self.description = description
        self.expense_date = expense_date
        self.tags = tags if tags is not None else []

    def __repr__(self):
        return f"Expense(amount={self.amount!r}, category={self.category!r})"


def import_from_csv_data(rows):
    """Import expenses from CSV-like row dicts.

    In a real app this reads from csv.DictReader which returns all values as strings.
    Expected keys: amount, category, description, date, tags
    """
    expenses = []
    for row in rows:
        tags = (
            [t.strip() for t in row.get("tags", "").split(";") if t.strip()]
            if row.get("tags")
            else []
        )
        expenses.append(
            Expense(
                amount=float(row["amount"]),
                category=row["category"],
                description=row["description"],
                expense_date=date.fromisoformat(row["date"]),
                tags=tags,
            )
        )
    return expenses


def filter_by_min_amount(expenses, min_amount):
    """Filter expenses at or above a minimum amount."""
    return [e for e in expenses if e.amount >= min_amount]`,
      },
    ],
    testFiles: [
      {
        filename: 'test_csv_io.py',
        language: 'python',
        code: `from datetime import date

# Expense class, import_from_csv_data, and filter_by_min_amount are defined in the source file above

def run_tests():
    passed = 0
    failed = 0

    # Simulate CSV data (all values are strings, as csv.DictReader returns)
    csv_rows = [
        {"amount": "45.50", "category": "food", "description": "Grocery store", "date": "2024-01-15", "tags": "groceries;weekly"},
        {"amount": "120.00", "category": "utilities", "description": "Electric bill", "date": "2024-01-20", "tags": "monthly"},
        {"amount": "9.99", "category": "food", "description": "Coffee", "date": "2024-01-22", "tags": ""},
        {"amount": "250.00", "category": "rent", "description": "Monthly rent", "date": "2024-02-01", "tags": "housing;monthly"},
    ]

    expenses = import_from_csv_data(csv_rows)

    # Test 1: Imported amounts should be floats
    if isinstance(expenses[0].amount, float):
        print("[PASS] Imported amount is a float")
        passed += 1
    else:
        print(f"[FAIL] Imported amount is {type(expenses[0].amount).__name__}, expected float")
        failed += 1

    # Test 2: Sum of amounts works correctly
    try:
        total = sum(e.amount for e in expenses)
        if abs(total - 425.49) < 0.01:
            print("[PASS] Sum of amounts = 425.49")
            passed += 1
        else:
            print(f"[FAIL] Sum of amounts: expected 425.49, got {total}")
            failed += 1
    except TypeError as e:
        print(f"[FAIL] Sum raised TypeError: {e}")
        failed += 1

    # Test 3: Filtering by amount should work without TypeError
    try:
        expensive = filter_by_min_amount(expenses, 100.0)
        if len(expensive) == 2:
            print("[PASS] Filter by min amount returns 2 results")
            passed += 1
        else:
            print(f"[FAIL] Filter by min amount: expected 2, got {len(expensive)}")
            failed += 1
    except TypeError as e:
        print(f"[FAIL] Filter raised TypeError: {e}")
        failed += 1

    # Test 4: Arithmetic on amounts works
    doubled = expenses[0].amount * 2
    if abs(doubled - 91.0) < 0.01:
        print("[PASS] Arithmetic on amount works (45.50 * 2 = 91.0)")
        passed += 1
    else:
        print(f"[FAIL] 45.50 * 2: expected 91.0, got {doubled}")
        failed += 1

    # Test 5: Numeric comparison works
    if expenses[3].amount > expenses[0].amount:
        print("[PASS] Numeric comparison works (250.00 > 45.50)")
        passed += 1
    else:
        print("[FAIL] Numeric comparison failed: 250.00 should be > 45.50")
        failed += 1

    print(f"\\n{passed + failed} tests: {passed} passed, {failed} failed")

run_tests()`,
      },
    ],
    solutionExplanation: `### Root Cause

\`csv.DictReader\` returns **all** field values as strings. The import function assigns the amount directly without conversion:

\`\`\`python
amount=row["amount"],  # "45.50" (string), not 45.50 (float)
\`\`\`

When you later try to sum these "amounts", Python concatenates strings instead of adding numbers: \`"45.50" + "120.00"\` = \`"45.50120.00"\`.

### Fix

Convert the string to a float:

\`\`\`python
amount=float(row["amount"]),
\`\`\``,
  },

  // -----------------------------------------------------------------------
  // Bug 4 — Category Filters All Match the Same Category
  // -----------------------------------------------------------------------
  {
    id: 'expense-tracker-4',
    project: 'expense-tracker',
    projectLabel: 'Expense Tracker',
    bugNumber: 4,
    title: 'Category Filters All Match the Same Category',
    difficulty: 'hard',
    category: 'late-binding',
    language: 'python',
    symptom: `### Symptom

\`build_category_filters()\` creates a dict of filter functions, one per category. But every filter matches the **last** category in the list, regardless of which key you use.

\`\`\`python
filters = build_category_filters(["food", "transport", "entertainment"])
food_expense = Expense(10, "food", "Lunch", date(2024, 1, 1))
print(filters["food"](food_expense))        # False -- should be True!
print(filters["entertainment"](food_expense))  # True -- wrong!
\`\`\`

### What you know

The function loops over a list of category names and creates a lambda for each one. The lambdas are stored in a dictionary keyed by category name. But when you actually call any of them, they all behave as if the category is the last item from the list.`,
    hints: [
      'Look at how the lambda captures the loop variable `cat`. Does it capture the value or the variable itself?',
      'Python closures capture **variables by reference**, not by value. After the loop completes, `cat` holds the last category. All lambdas read from the same `cat` variable.',
      'Use a default argument to capture the current value at creation time: `lambda expense, c=cat: expense.category == c`.',
    ],
    files: [
      {
        filename: 'filters.py',
        language: 'python',
        buggyCode: `"""Filtering and query functions for expenses."""
from datetime import date


class Expense:
    """A single expense entry."""
    def __init__(self, amount: float, category: str, description: str,
                 expense_date: date):
        self.amount = amount
        self.category = category
        self.description = description
        self.expense_date = expense_date


def build_category_filters(categories: list) -> dict:
    """Build a dict of filter functions, one per category.

    Usage:
        filters = build_category_filters(["food", "transport"])
        is_food = filters["food"]
        assert is_food(some_food_expense) is True
    """
    filters = {}
    for cat in categories:
        filters[cat] = lambda expense: expense.category == cat
    return filters`,
        solutionCode: `"""Filtering and query functions for expenses."""
from datetime import date


class Expense:
    """A single expense entry."""
    def __init__(self, amount: float, category: str, description: str,
                 expense_date: date):
        self.amount = amount
        self.category = category
        self.description = description
        self.expense_date = expense_date


def build_category_filters(categories: list) -> dict:
    """Build a dict of filter functions, one per category.

    Usage:
        filters = build_category_filters(["food", "transport"])
        is_food = filters["food"]
        assert is_food(some_food_expense) is True
    """
    filters = {}
    for cat in categories:
        filters[cat] = lambda expense, c=cat: expense.category == c
    return filters`,
      },
    ],
    testFiles: [
      {
        filename: 'test_filters.py',
        language: 'python',
        code: `from datetime import date

# Expense class and build_category_filters function are defined in the source file above

def run_tests():
    passed = 0
    failed = 0

    categories = ["food", "transport", "entertainment"]
    filters = build_category_filters(categories)

    food_expense = Expense(10.0, "food", "Lunch", date(2024, 1, 1))
    transport_expense = Expense(5.0, "transport", "Bus", date(2024, 1, 1))
    entertainment_expense = Expense(20.0, "entertainment", "Movie", date(2024, 1, 1))

    # Test 1: Food filter matches food expense
    if filters["food"](food_expense):
        print("[PASS] Food filter matches food expense")
        passed += 1
    else:
        print("[FAIL] Food filter did not match food expense")
        failed += 1

    # Test 2: Food filter rejects transport expense
    if not filters["food"](transport_expense):
        print("[PASS] Food filter rejects transport expense")
        passed += 1
    else:
        print("[FAIL] Food filter incorrectly matched transport expense")
        failed += 1

    # Test 3: Transport filter matches transport expense
    if filters["transport"](transport_expense):
        print("[PASS] Transport filter matches transport expense")
        passed += 1
    else:
        print("[FAIL] Transport filter did not match transport expense")
        failed += 1

    # Test 4: Entertainment filter matches entertainment expense
    if filters["entertainment"](entertainment_expense):
        print("[PASS] Entertainment filter matches entertainment expense")
        passed += 1
    else:
        print("[FAIL] Entertainment filter did not match entertainment expense")
        failed += 1

    # Test 5: Each filter only matches its own category
    all_correct = True
    for cat_name in categories:
        for expense in [food_expense, transport_expense, entertainment_expense]:
            expected = (expense.category == cat_name)
            actual = filters[cat_name](expense)
            if actual != expected:
                all_correct = False
                break
    if all_correct:
        print("[PASS] Each filter exclusively matches its own category")
        passed += 1
    else:
        print("[FAIL] Some filters matched wrong categories")
        failed += 1

    print(f"\\n{passed + failed} tests: {passed} passed, {failed} failed")

run_tests()`,
      },
    ],
    solutionExplanation: `### Root Cause

The lambda captures the loop variable \`cat\` **by reference**, not by value:

\`\`\`python
for cat in categories:
    filters[cat] = lambda expense: expense.category == cat
\`\`\`

After the loop finishes, \`cat\` holds the **last** category (\`"entertainment"\`). All three lambdas reference the same \`cat\` variable, so they all compare against \`"entertainment"\`.

This is a classic Python gotcha known as **late binding in closures**.

### Fix

Use a default argument to capture the current value of \`cat\` at lambda creation time:

\`\`\`python
filters[cat] = lambda expense, c=cat: expense.category == c
\`\`\`

Default argument values are evaluated when the lambda is defined, so each lambda captures its own value.`,
  },

  // -----------------------------------------------------------------------
  // Bug 5 — Date Range Excludes the End Date
  // -----------------------------------------------------------------------
  {
    id: 'expense-tracker-5',
    project: 'expense-tracker',
    projectLabel: 'Expense Tracker',
    bugNumber: 5,
    title: 'Date Range Excludes the End Date',
    difficulty: 'easy',
    category: 'off-by-one',
    language: 'python',
    symptom: `### Symptom

When filtering expenses by a date range, expenses on the **end date** are excluded. For example, filtering from Jan 1 to Jan 3 only returns expenses from Jan 1 and Jan 2 -- expenses on Jan 3 are missing.

### What you know

The \`filter_by_date_range()\` function takes a list of expenses, a start date, and an end date. Both the start and end dates should be **inclusive**. The function's docstring says "inclusive on both ends."`,
    hints: [
      'Look carefully at the comparison operators in the list comprehension.',
      'The filter uses `<` (strict less than) for the end date comparison instead of `<=` (less than or equal).',
      'Change `start_date <= e.expense_date < end_date` to `start_date <= e.expense_date <= end_date`.',
    ],
    files: [
      {
        filename: 'filters.py',
        language: 'python',
        buggyCode: `"""Filtering and query functions for expenses."""
from datetime import date


class Expense:
    """A single expense entry."""
    def __init__(self, amount: float, category: str, description: str,
                 expense_date: date):
        self.amount = amount
        self.category = category
        self.description = description
        self.expense_date = expense_date

    def __repr__(self):
        return f"Expense(amount={self.amount}, category={self.category!r})"


def filter_by_date_range(expenses: list, start_date: date, end_date: date) -> list:
    """Filter expenses within a date range (inclusive on both ends)."""
    return [
        e for e in expenses
        if start_date <= e.expense_date < end_date
    ]`,
        solutionCode: `"""Filtering and query functions for expenses."""
from datetime import date


class Expense:
    """A single expense entry."""
    def __init__(self, amount: float, category: str, description: str,
                 expense_date: date):
        self.amount = amount
        self.category = category
        self.description = description
        self.expense_date = expense_date

    def __repr__(self):
        return f"Expense(amount={self.amount}, category={self.category!r})"


def filter_by_date_range(expenses: list, start_date: date, end_date: date) -> list:
    """Filter expenses within a date range (inclusive on both ends)."""
    return [
        e for e in expenses
        if start_date <= e.expense_date <= end_date
    ]`,
      },
    ],
    testFiles: [
      {
        filename: 'test_filters.py',
        language: 'python',
        code: `from datetime import date

# Expense class and filter_by_date_range function are defined in the source file above

def run_tests():
    passed = 0
    failed = 0

    expenses = [
        Expense(10.0, "food", "Jan 1 lunch", date(2024, 1, 1)),
        Expense(20.0, "food", "Jan 2 lunch", date(2024, 1, 2)),
        Expense(30.0, "food", "Jan 3 lunch", date(2024, 1, 3)),
        Expense(40.0, "food", "Jan 4 lunch", date(2024, 1, 4)),
        Expense(50.0, "food", "Jan 5 lunch", date(2024, 1, 5)),
    ]

    # Test 1: End date is included
    result = filter_by_date_range(expenses, date(2024, 1, 1), date(2024, 1, 3))
    if len(result) == 3:
        print("[PASS] Jan 1-3 range returns 3 expenses (inclusive)")
        passed += 1
    else:
        print(f"[FAIL] Jan 1-3 range: expected 3, got {len(result)}")
        failed += 1

    # Test 2: Single day range works
    result = filter_by_date_range(expenses, date(2024, 1, 2), date(2024, 1, 2))
    if len(result) == 1 and result[0].amount == 20.0:
        print("[PASS] Single day range returns 1 expense")
        passed += 1
    else:
        print(f"[FAIL] Single day range: expected 1, got {len(result)}")
        failed += 1

    # Test 3: Full range returns all
    result = filter_by_date_range(expenses, date(2024, 1, 1), date(2024, 1, 5))
    if len(result) == 5:
        print("[PASS] Full range returns all 5 expenses")
        passed += 1
    else:
        print(f"[FAIL] Full range: expected 5, got {len(result)}")
        failed += 1

    # Test 4: Range outside data returns empty
    result = filter_by_date_range(expenses, date(2024, 2, 1), date(2024, 2, 28))
    if len(result) == 0:
        print("[PASS] Range outside data returns empty list")
        passed += 1
    else:
        print(f"[FAIL] Out-of-range: expected 0, got {len(result)}")
        failed += 1

    # Test 5: Start date is included
    result = filter_by_date_range(expenses, date(2024, 1, 3), date(2024, 1, 5))
    if len(result) == 3 and result[0].amount == 30.0:
        print("[PASS] Start date is included in results")
        passed += 1
    else:
        print(f"[FAIL] Start date check: expected 3 results starting with 30.0, got {len(result)}")
        failed += 1

    print(f"\\n{passed + failed} tests: {passed} passed, {failed} failed")

run_tests()`,
      },
    ],
    solutionExplanation: `### Root Cause

The date range filter uses \`<\` (strict less than) for the upper bound instead of \`<=\`:

\`\`\`python
if start_date <= e.expense_date < end_date
\`\`\`

This excludes expenses that fall exactly on the end date. The docstring says "inclusive on both ends" but the implementation only includes the start date.

### Fix

Change \`<\` to \`<=\`:

\`\`\`python
if start_date <= e.expense_date <= end_date
\`\`\``,
  },

  // -----------------------------------------------------------------------
  // Bug 6 — Average Daily Spending Loses Cents
  // -----------------------------------------------------------------------
  {
    id: 'expense-tracker-6',
    project: 'expense-tracker',
    projectLabel: 'Expense Tracker',
    bugNumber: 6,
    title: 'Average Daily Spending Loses Cents',
    difficulty: 'easy',
    category: 'operator',
    language: 'python',
    symptom: `### Symptom

The "Average Daily Spending" calculation drops all decimal places. For example, $100 of spending over 3 days reports an average of **$33** instead of **$33.33**.

### What you know

The \`average_daily_spending()\` function takes a list of expenses and a number of days, and should return the average daily amount with cents preserved.

Users expect to see values like \`33.33\`, not \`33\`.`,
    hints: [
      'Python has two division operators. Which one is being used here?',
      '`//` is floor division -- it truncates the decimal part. `100 // 3` gives `33`, not `33.33`.',
      'Change `//` to `/` for true division that preserves decimals.',
    ],
    files: [
      {
        filename: 'reports.py',
        language: 'python',
        buggyCode: `"""Report generation for expense data."""
from datetime import date


class Expense:
    """A single expense entry."""
    def __init__(self, amount: float, category: str, description: str, expense_date: date):
        self.amount = amount
        self.category = category
        self.description = description
        self.expense_date = expense_date

    def __repr__(self):
        return f"Expense(amount={self.amount}, category={self.category!r})"


def average_daily_spending(expenses: list, num_days: int) -> float:
    """Calculate average daily spending over a period."""
    if not expenses or num_days == 0:
        return 0.0
    total = sum(e.amount for e in expenses)
    return total // num_days


def category_breakdown(expenses: list) -> dict:
    """Break down total spending by category."""
    breakdown = {}
    for expense in expenses:
        breakdown[expense.category] = breakdown.get(expense.category, 0) + expense.amount
    return breakdown`,
        solutionCode: `"""Report generation for expense data."""
from datetime import date


class Expense:
    """A single expense entry."""
    def __init__(self, amount: float, category: str, description: str, expense_date: date):
        self.amount = amount
        self.category = category
        self.description = description
        self.expense_date = expense_date

    def __repr__(self):
        return f"Expense(amount={self.amount}, category={self.category!r})"


def average_daily_spending(expenses: list, num_days: int) -> float:
    """Calculate average daily spending over a period."""
    if not expenses or num_days == 0:
        return 0.0
    total = sum(e.amount for e in expenses)
    return total / num_days


def category_breakdown(expenses: list) -> dict:
    """Break down total spending by category."""
    breakdown = {}
    for expense in expenses:
        breakdown[expense.category] = breakdown.get(expense.category, 0) + expense.amount
    return breakdown`,
      },
    ],
    testFiles: [
      {
        filename: 'test_reports.py',
        language: 'python',
        code: `from datetime import date

# Expense class and functions are defined in the source file above

def run_tests():
    passed = 0
    failed = 0

    # Test 1: Basic average
    expenses = [
        Expense(100.0, "food", "Groceries", date(2024, 1, 15)),
    ]
    result = average_daily_spending(expenses, 3)
    if abs(result - 33.333333) < 0.01:
        print("[PASS] $100 over 3 days = ~$33.33")
        passed += 1
    else:
        print(f"[FAIL] $100 over 3 days: expected ~33.33, got {result}")
        failed += 1

    # Test 2: Multiple expenses
    expenses = [
        Expense(50.0, "food", "Groceries", date(2024, 1, 15)),
        Expense(30.0, "transport", "Bus pass", date(2024, 1, 15)),
        Expense(20.0, "food", "Lunch", date(2024, 1, 16)),
    ]
    result = average_daily_spending(expenses, 7)
    if abs(result - 14.2857) < 0.01:
        print("[PASS] $100 over 7 days = ~$14.29")
        passed += 1
    else:
        print(f"[FAIL] $100 over 7 days: expected ~14.29, got {result}")
        failed += 1

    # Test 3: Empty list
    result = average_daily_spending([], 5)
    if result == 0.0:
        print("[PASS] Empty expenses returns 0.0")
        passed += 1
    else:
        print(f"[FAIL] Empty expenses: expected 0.0, got {result}")
        failed += 1

    # Test 4: Zero days
    expenses = [Expense(50.0, "food", "Groceries", date(2024, 1, 15))]
    result = average_daily_spending(expenses, 0)
    if result == 0.0:
        print("[PASS] Zero days returns 0.0")
        passed += 1
    else:
        print(f"[FAIL] Zero days: expected 0.0, got {result}")
        failed += 1

    # Test 5: Exact division
    expenses = [
        Expense(30.0, "food", "Groceries", date(2024, 1, 15)),
        Expense(30.0, "food", "Lunch", date(2024, 1, 16)),
    ]
    result = average_daily_spending(expenses, 3)
    if result == 20.0:
        print("[PASS] $60 over 3 days = $20.00")
        passed += 1
    else:
        print(f"[FAIL] $60 over 3 days: expected 20.0, got {result}")
        failed += 1

    print(f"\\n{passed + failed} tests: {passed} passed, {failed} failed")

run_tests()`,
      },
    ],
    solutionExplanation: `### Root Cause

The function uses Python's floor division operator \`//\` instead of true division \`/\`:

\`\`\`python
return total // num_days   # floor division -- truncates decimals
\`\`\`

\`100 // 3\` returns \`33\` (integer), not \`33.333...\` (float).

### Fix

\`\`\`python
return total / num_days    # true division -- preserves decimals
\`\`\``,
  },

  // -----------------------------------------------------------------------
  // Bug 7 — Removing Expired Budgets Crashes
  // -----------------------------------------------------------------------
  {
    id: 'expense-tracker-7',
    project: 'expense-tracker',
    projectLabel: 'Expense Tracker',
    bugNumber: 7,
    title: 'Removing Expired Budgets Crashes',
    difficulty: 'medium',
    category: 'mutate-during-iteration',
    language: 'python',
    symptom: `### Symptom

Calling \`cleanup_expired_budgets()\` raises a \`RuntimeError: dictionary changed size during iteration\`.

### What you know

The \`ExpenseStore\` class has a \`budgets\` dict mapping category names to \`Budget\` objects. The \`cleanup_expired_budgets()\` method should remove all budgets whose end date has passed. But it crashes every time there is at least one expired budget.

\`\`\`
RuntimeError: dictionary changed size during iteration
\`\`\``,
    hints: [
      'Look at what happens inside the `for` loop. Is the dictionary being modified while being iterated?',
      '`del self.budgets[category]` inside `for category, budget in self.budgets.items()` modifies the dict during iteration. Python 3 does not allow this.',
      'Collect the expired keys into a separate list first, then delete them in a second loop.',
    ],
    files: [
      {
        filename: 'store.py',
        language: 'python',
        buggyCode: `"""Persistence layer for expenses and budgets."""
from datetime import date


class Budget:
    """A monthly spending budget for a category."""
    def __init__(self, category: str, monthly_limit: float,
                 start_date: date, end_date: date = None):
        self.category = category
        self.monthly_limit = monthly_limit
        self.start_date = start_date
        self.end_date = end_date

    def is_expired(self) -> bool:
        if self.end_date is None:
            return False
        return date.today() > self.end_date


class ExpenseStore:
    """Manages expense and budget persistence."""

    def __init__(self):
        self.budgets = {}
        self._saved = False

    def set_budget(self, budget: Budget):
        """Set a budget for a category."""
        self.budgets[budget.category] = budget

    def save(self):
        """Simulate saving to disk."""
        self._saved = True

    def cleanup_expired_budgets(self):
        """Remove budgets that have passed their end date."""
        for category, budget in self.budgets.items():
            if budget.is_expired():
                del self.budgets[category]
        self.save()`,
        solutionCode: `"""Persistence layer for expenses and budgets."""
from datetime import date


class Budget:
    """A monthly spending budget for a category."""
    def __init__(self, category: str, monthly_limit: float,
                 start_date: date, end_date: date = None):
        self.category = category
        self.monthly_limit = monthly_limit
        self.start_date = start_date
        self.end_date = end_date

    def is_expired(self) -> bool:
        if self.end_date is None:
            return False
        return date.today() > self.end_date


class ExpenseStore:
    """Manages expense and budget persistence."""

    def __init__(self):
        self.budgets = {}
        self._saved = False

    def set_budget(self, budget: Budget):
        """Set a budget for a category."""
        self.budgets[budget.category] = budget

    def save(self):
        """Simulate saving to disk."""
        self._saved = True

    def cleanup_expired_budgets(self):
        """Remove budgets that have passed their end date."""
        expired = [cat for cat, budget in self.budgets.items() if budget.is_expired()]
        for cat in expired:
            del self.budgets[cat]
        self.save()`,
      },
    ],
    testFiles: [
      {
        filename: 'test_store.py',
        language: 'python',
        code: `from datetime import date, timedelta

# Budget and ExpenseStore classes are defined in the source file above

def run_tests():
    passed = 0
    failed = 0

    today = date.today()
    past = today - timedelta(days=30)
    future = today + timedelta(days=30)

    # Test 1: Cleanup does not crash
    store = ExpenseStore()
    store.set_budget(Budget("food", 500.0, past, past))  # expired
    store.set_budget(Budget("transport", 200.0, past, future))  # active
    try:
        store.cleanup_expired_budgets()
        print("[PASS] cleanup_expired_budgets() did not crash")
        passed += 1
    except RuntimeError as e:
        print(f"[FAIL] cleanup_expired_budgets() raised RuntimeError: {e}")
        failed += 1

    # Test 2: Expired budget is removed
    if "food" not in store.budgets:
        print("[PASS] Expired 'food' budget was removed")
        passed += 1
    else:
        print("[FAIL] Expired 'food' budget still exists")
        failed += 1

    # Test 3: Active budget is kept
    if "transport" in store.budgets:
        print("[PASS] Active 'transport' budget was kept")
        passed += 1
    else:
        print("[FAIL] Active 'transport' budget was removed")
        failed += 1

    # Test 4: Multiple expired budgets are all removed
    store2 = ExpenseStore()
    store2.set_budget(Budget("food", 500.0, past, past))
    store2.set_budget(Budget("transport", 200.0, past, past))
    store2.set_budget(Budget("entertainment", 100.0, past, past))
    store2.set_budget(Budget("rent", 1500.0, past, future))
    try:
        store2.cleanup_expired_budgets()
        remaining = list(store2.budgets.keys())
        if remaining == ["rent"]:
            print("[PASS] All 3 expired budgets removed, 'rent' kept")
            passed += 1
        else:
            print(f"[FAIL] Expected only ['rent'], got {remaining}")
            failed += 1
    except RuntimeError:
        print("[FAIL] Crashed with multiple expired budgets")
        failed += 1

    # Test 5: No expired budgets -- nothing changes
    store3 = ExpenseStore()
    store3.set_budget(Budget("food", 500.0, past, future))
    store3.cleanup_expired_budgets()
    if "food" in store3.budgets:
        print("[PASS] No expired budgets -- nothing removed")
        passed += 1
    else:
        print("[FAIL] Active budget was incorrectly removed")
        failed += 1

    print(f"\\n{passed + failed} tests: {passed} passed, {failed} failed")

run_tests()`,
      },
    ],
    solutionExplanation: `### Root Cause

The method deletes from the dictionary while iterating over it:

\`\`\`python
for category, budget in self.budgets.items():
    if budget.is_expired():
        del self.budgets[category]  # Modifies dict during iteration!
\`\`\`

In Python 3, modifying a dictionary's size during iteration raises \`RuntimeError: dictionary changed size during iteration\`.

### Fix

Collect keys to delete first, then delete in a separate loop:

\`\`\`python
expired = [cat for cat, budget in self.budgets.items() if budget.is_expired()]
for cat in expired:
    del self.budgets[cat]
\`\`\``,
  },

  // -----------------------------------------------------------------------
  // Bug 8 — CSV Export Silently Produces Empty File
  // -----------------------------------------------------------------------
  {
    id: 'expense-tracker-8',
    project: 'expense-tracker',
    projectLabel: 'Expense Tracker',
    bugNumber: 8,
    title: 'CSV Export Silently Produces Empty File',
    difficulty: 'hard',
    category: 'silent-exception',
    language: 'python',
    symptom: `### Symptom

Exporting expenses to CSV produces output that only contains the header row. No expense data rows are written, even though the expense list is not empty. There are **no error messages** -- the function completes silently.

### What you know

The \`export_csv()\` function receives a list of \`Expense\` objects. It builds a list of CSV rows starting with a header, then iterates over expenses calling \`expense.to_row()\` for each one. The output has headers but zero data rows.

There are **two bugs** working together to hide the problem.`,
    hints: [
      'Look at `to_row()` -- does it reference the correct attribute name for the date?',
      'The `to_row()` method uses `self.date` but the attribute is actually called `self.expense_date`. This raises `AttributeError`. Now look at `export_csv()` -- why is there no error?',
      'The bare `except: pass` in `export_csv()` catches the `AttributeError` and silently ignores it. Fix the attribute name in `to_row()` AND remove the bare except.',
    ],
    files: [
      {
        filename: 'models.py',
        language: 'python',
        buggyCode: `"""Domain models for the expense tracker."""
from datetime import date


class Expense:
    """A single expense entry."""

    def __init__(self, amount: float, category: str, description: str,
                 expense_date: date, id: str = None, tags: list = None):
        self.id = id or "auto"
        self.amount = amount
        self.category = category
        self.description = description
        self.expense_date = expense_date
        self.tags = tags if tags is not None else []

    def __repr__(self):
        return f"Expense(id={self.id!r}, amount={self.amount}, category={self.category!r})"

    def to_row(self) -> list:
        """Convert to a flat list for CSV export."""
        return [
            self.id,
            str(self.amount),
            self.category,
            self.description,
            self.date.isoformat(),
            ";".join(self.tags),
        ]`,
        solutionCode: `"""Domain models for the expense tracker."""
from datetime import date


class Expense:
    """A single expense entry."""

    def __init__(self, amount: float, category: str, description: str,
                 expense_date: date, id: str = None, tags: list = None):
        self.id = id or "auto"
        self.amount = amount
        self.category = category
        self.description = description
        self.expense_date = expense_date
        self.tags = tags if tags is not None else []

    def __repr__(self):
        return f"Expense(id={self.id!r}, amount={self.amount}, category={self.category!r})"

    def to_row(self) -> list:
        """Convert to a flat list for CSV export."""
        return [
            self.id,
            str(self.amount),
            self.category,
            self.description,
            self.expense_date.isoformat(),
            ";".join(self.tags),
        ]`,
      },
      {
        filename: 'csv_io.py',
        language: 'python',
        buggyCode: `"""CSV export functionality."""


def export_csv(expenses: list) -> list:
    """Export expenses to CSV rows."""
    rows = []
    header = ["id", "amount", "category", "description", "date", "tags"]
    rows.append(header)
    try:
        for expense in expenses:
            rows.append(expense.to_row())
    except:
        pass
    return rows`,
        solutionCode: `"""CSV export functionality."""


def export_csv(expenses: list) -> list:
    """Export expenses to CSV rows."""
    rows = []
    header = ["id", "amount", "category", "description", "date", "tags"]
    rows.append(header)
    for expense in expenses:
        rows.append(expense.to_row())
    return rows`,
      },
    ],
    testFiles: [
      {
        filename: 'test_csv_export.py',
        language: 'python',
        code: `from datetime import date

# Expense class and export_csv function are defined in the source files above

def run_tests():
    passed = 0
    failed = 0

    expenses = [
        Expense(50.0, "food", "Groceries", date(2024, 1, 15), id="e1", tags=["weekly"]),
        Expense(30.0, "transport", "Bus pass", date(2024, 1, 16), id="e2"),
        Expense(20.0, "food", "Lunch", date(2024, 1, 17), id="e3", tags=["work"]),
    ]

    # Test 1: to_row() does not raise an error
    try:
        row = expenses[0].to_row()
        print("[PASS] to_row() does not raise an error")
        passed += 1
    except AttributeError as e:
        print(f"[FAIL] to_row() raised AttributeError: {e}")
        failed += 1

    # Test 2: to_row() returns correct date
    try:
        row = expenses[0].to_row()
        if row[4] == "2024-01-15":
            print("[PASS] to_row() returns correct date string")
            passed += 1
        else:
            print(f"[FAIL] to_row() date: expected '2024-01-15', got '{row[4]}'")
            failed += 1
    except Exception as e:
        print(f"[FAIL] to_row() raised {type(e).__name__}: {e}")
        failed += 1

    # Test 3: export_csv writes data rows
    rows = export_csv(expenses)
    if len(rows) == 4:  # 1 header + 3 data rows
        print("[PASS] CSV output has header + 3 data rows")
        passed += 1
    else:
        print(f"[FAIL] CSV output has {len(rows)} rows, expected 4")
        failed += 1

    # Test 4: CSV data content is correct
    rows = export_csv(expenses)
    if len(rows) >= 2 and rows[1][0] == "e1" and rows[1][2] == "food":
        print("[PASS] First data row has correct id and category")
        passed += 1
    else:
        content = rows[1] if len(rows) >= 2 else "missing"
        print(f"[FAIL] First data row is incorrect: {content}")
        failed += 1

    # Test 5: export_csv does not silently swallow errors
    class BadExpense:
        def to_row(self):
            raise ValueError("bad data")
    try:
        export_csv([BadExpense()])
        print("[FAIL] export_csv should not silently swallow errors")
        failed += 1
    except Exception:
        print("[PASS] export_csv raises error on bad data instead of swallowing it")
        passed += 1

    print(f"\\n{passed + failed} tests: {passed} passed, {failed} failed")

run_tests()`,
      },
    ],
    solutionExplanation: `### Root Cause

There are **two bugs** working together:

1. **Wrong attribute name** in \`to_row()\`:
\`\`\`python
self.date.isoformat()  # AttributeError -- the attribute is self.expense_date
\`\`\`

2. **Bare \`except: pass\`** in \`export_csv()\` catches the \`AttributeError\` and silently ignores it, so no rows are written and no error is reported.

### Fix

Fix the attribute name and remove the bare except:

\`\`\`python
# models.py -- to_row()
self.expense_date.isoformat()  # was: self.date.isoformat()

# csv_io.py -- export_csv()
# Remove the try/except entirely
\`\`\``,
  },

  // -----------------------------------------------------------------------
  // Bug 9 — Can't Deduplicate Expenses with set()
  // -----------------------------------------------------------------------
  {
    id: 'expense-tracker-9',
    project: 'expense-tracker',
    projectLabel: 'Expense Tracker',
    bugNumber: 9,
    title: "Can't Deduplicate Expenses with set()",
    difficulty: 'medium',
    category: 'hashability',
    language: 'python',
    symptom: `### Symptom

Trying to deduplicate a list of expenses using \`set()\` raises \`TypeError: unhashable type: 'Expense'\`.

\`\`\`python
expenses = [e1, e2, e1]  # e1 appears twice
unique = set(expenses)    # TypeError: unhashable type: 'Expense'
\`\`\`

### What you know

The \`Expense\` class has an \`__eq__\` method that compares by \`id\`. Two expenses with the same \`id\` are considered equal. But putting them in a \`set\` fails.`,
    hints: [
      'What does Python require for an object to be placed in a `set` or used as a dict key?',
      'In Python 3, if you define `__eq__`, Python automatically sets `__hash__` to `None`. This makes the object unhashable.',
      'Add a `__hash__` method that returns `hash(self.id)` to match the `__eq__` logic.',
    ],
    files: [
      {
        filename: 'models.py',
        language: 'python',
        buggyCode: `"""Domain models for the expense tracker."""
from datetime import date


class Expense:
    """A single expense entry."""

    def __init__(self, amount: float, category: str, description: str,
                 expense_date: date, id: str = None):
        self.id = id or "auto"
        self.amount = amount
        self.category = category
        self.description = description
        self.expense_date = expense_date

    def __repr__(self):
        return f"Expense(id={self.id!r}, amount={self.amount}, category={self.category!r})"

    def __eq__(self, other):
        if not isinstance(other, Expense):
            return NotImplemented
        return self.id == other.id`,
        solutionCode: `"""Domain models for the expense tracker."""
from datetime import date


class Expense:
    """A single expense entry."""

    def __init__(self, amount: float, category: str, description: str,
                 expense_date: date, id: str = None):
        self.id = id or "auto"
        self.amount = amount
        self.category = category
        self.description = description
        self.expense_date = expense_date

    def __repr__(self):
        return f"Expense(id={self.id!r}, amount={self.amount}, category={self.category!r})"

    def __eq__(self, other):
        if not isinstance(other, Expense):
            return NotImplemented
        return self.id == other.id

    def __hash__(self):
        return hash(self.id)`,
      },
    ],
    testFiles: [
      {
        filename: 'test_models.py',
        language: 'python',
        code: `from datetime import date

# Expense class is defined in the source file above

def run_tests():
    passed = 0
    failed = 0

    # Test 1: set() does not raise TypeError
    e1 = Expense(10.0, "food", "Lunch", date(2024, 1, 1), id="abc")
    e2 = Expense(20.0, "food", "Dinner", date(2024, 1, 1), id="def")
    try:
        result = set([e1, e2])
        print("[PASS] set() does not raise TypeError")
        passed += 1
    except TypeError as e:
        print(f"[FAIL] set() raised TypeError: {e}")
        failed += 1

    # Test 2: Duplicates are removed by set()
    e3 = Expense(10.0, "food", "Lunch copy", date(2024, 1, 1), id="abc")
    try:
        unique = set([e1, e2, e3])
        if len(unique) == 2:
            print("[PASS] set() removed duplicate (same id)")
            passed += 1
        else:
            print(f"[FAIL] Expected 2 unique expenses, got {len(unique)}")
            failed += 1
    except TypeError:
        print("[FAIL] set() raised TypeError -- cannot deduplicate")
        failed += 1

    # Test 3: Expense can be used as dict key
    try:
        expense_counts = {e1: 1, e2: 2}
        if expense_counts[e1] == 1:
            print("[PASS] Expense works as dict key")
            passed += 1
        else:
            print("[FAIL] Dict lookup returned wrong value")
            failed += 1
    except TypeError:
        print("[FAIL] Expense cannot be used as dict key")
        failed += 1

    # Test 4: Equal expenses have equal hashes
    e4 = Expense(99.0, "other", "Different data", date(2024, 6, 1), id="abc")
    try:
        if hash(e1) == hash(e4):
            print("[PASS] Equal expenses (same id) have equal hashes")
            passed += 1
        else:
            print("[FAIL] Equal expenses have different hashes")
            failed += 1
    except TypeError:
        print("[FAIL] Cannot hash expense object")
        failed += 1

    # Test 5: Different expenses can have different hashes
    try:
        if hash(e1) != hash(e2):
            print("[PASS] Different expenses have different hashes")
            passed += 1
        else:
            # Not strictly wrong, but very unlikely for good hash functions
            print("[PASS] Different expenses have same hash (collision, but acceptable)")
            passed += 1
    except TypeError:
        print("[FAIL] Cannot hash expense object")
        failed += 1

    print(f"\\n{passed + failed} tests: {passed} passed, {failed} failed")

run_tests()`,
      },
    ],
    solutionExplanation: `### Root Cause

The \`Expense\` class defines \`__eq__\` but not \`__hash__\`. In Python 3, defining \`__eq__\` automatically sets \`__hash__\` to \`None\`, making instances **unhashable**. This means they cannot be placed in a \`set\` or used as dictionary keys.

\`\`\`python
def __eq__(self, other):
    return self.id == other.id
# Python implicitly sets __hash__ = None
\`\`\`

### Fix

Add a \`__hash__\` method that uses the same field as \`__eq__\`:

\`\`\`python
def __hash__(self):
    return hash(self.id)
\`\`\``,
  },

  // -----------------------------------------------------------------------
  // Bug 10 — Monthly Report Crashes on Any Data
  // -----------------------------------------------------------------------
  {
    id: 'expense-tracker-10',
    project: 'expense-tracker',
    projectLabel: 'Expense Tracker',
    bugNumber: 10,
    title: 'Monthly Report Crashes on Any Data',
    difficulty: 'hard',
    category: 'scope',
    language: 'python',
    symptom: `### Symptom

Calling \`generate_monthly_report()\` raises \`UnboundLocalError: cannot access local variable 'total' before assignment\` on the first expense it processes.

### What you know

The function uses a nested \`process_expense()\` function that tries to accumulate a running total. The outer function defines \`total = 0.0\`, and the inner function does \`total += expense.amount\`. But it crashes immediately.

Strangely, the \`categories\` dict (also defined in the outer scope) works fine with \`categories[cat] = ...\` inside the nested function.`,
    hints: [
      'Why does `total += expense.amount` fail but `categories[cat] = ...` works?',
      '`total += expense.amount` is an **augmented assignment** -- Python treats `total` as a local variable because of the `=`. Since it has not been assigned yet in this scope, reading it fails with `UnboundLocalError`. Dict mutation (`categories[cat] = ...`) is not an assignment to the variable itself.',
      'Add `nonlocal total` at the start of the nested function so Python knows `total` refers to the outer scope.',
    ],
    files: [
      {
        filename: 'reports.py',
        language: 'python',
        buggyCode: `"""Report generation for expense data."""
from datetime import date


class Expense:
    """A single expense entry."""
    def __init__(self, amount: float, category: str, description: str,
                 expense_date: date):
        self.amount = amount
        self.category = category
        self.description = description
        self.expense_date = expense_date


def generate_monthly_report(expenses: list, month: int, year: int) -> dict:
    """Generate a full monthly report with totals and category breakdown."""
    total = 0.0
    categories = {}

    def process_expense(expense):
        total += expense.amount
        cat = expense.category
        categories[cat] = categories.get(cat, 0) + expense.amount

    monthly = [
        e for e in expenses
        if e.expense_date.month == month and e.expense_date.year == year
    ]
    for e in monthly:
        process_expense(e)

    return {
        "month": f"{year}-{month:02d}",
        "total": total,
        "categories": categories,
        "count": len(monthly),
    }`,
        solutionCode: `"""Report generation for expense data."""
from datetime import date


class Expense:
    """A single expense entry."""
    def __init__(self, amount: float, category: str, description: str,
                 expense_date: date):
        self.amount = amount
        self.category = category
        self.description = description
        self.expense_date = expense_date


def generate_monthly_report(expenses: list, month: int, year: int) -> dict:
    """Generate a full monthly report with totals and category breakdown."""
    total = 0.0
    categories = {}

    def process_expense(expense):
        nonlocal total
        total += expense.amount
        cat = expense.category
        categories[cat] = categories.get(cat, 0) + expense.amount

    monthly = [
        e for e in expenses
        if e.expense_date.month == month and e.expense_date.year == year
    ]
    for e in monthly:
        process_expense(e)

    return {
        "month": f"{year}-{month:02d}",
        "total": total,
        "categories": categories,
        "count": len(monthly),
    }`,
      },
    ],
    testFiles: [
      {
        filename: 'test_reports.py',
        language: 'python',
        code: `from datetime import date

# Expense class and generate_monthly_report function are defined in the source file above

def run_tests():
    passed = 0
    failed = 0

    expenses = [
        Expense(50.0, "food", "Groceries", date(2024, 1, 15)),
        Expense(30.0, "transport", "Bus pass", date(2024, 1, 20)),
        Expense(20.0, "food", "Lunch", date(2024, 2, 5)),
    ]

    # Test 1: Does not crash
    try:
        report = generate_monthly_report(expenses, 1, 2024)
        print("[PASS] generate_monthly_report() did not crash")
        passed += 1
    except UnboundLocalError as e:
        print(f"[FAIL] UnboundLocalError: {e}")
        failed += 1

    # Test 2: Total is correct for January
    try:
        report = generate_monthly_report(expenses, 1, 2024)
        if abs(report["total"] - 80.0) < 0.01:
            print("[PASS] January total is 80.0")
            passed += 1
        else:
            print(f"[FAIL] January total: expected 80.0, got {report['total']}")
            failed += 1
    except Exception as e:
        print(f"[FAIL] Crashed: {e}")
        failed += 1

    # Test 3: Category breakdown is correct
    try:
        report = generate_monthly_report(expenses, 1, 2024)
        if report["categories"].get("food") == 50.0 and report["categories"].get("transport") == 30.0:
            print("[PASS] Category breakdown is correct")
            passed += 1
        else:
            print(f"[FAIL] Categories: {report['categories']}")
            failed += 1
    except Exception as e:
        print(f"[FAIL] Crashed: {e}")
        failed += 1

    # Test 4: Count is correct
    try:
        report = generate_monthly_report(expenses, 1, 2024)
        if report["count"] == 2:
            print("[PASS] January count is 2")
            passed += 1
        else:
            print(f"[FAIL] January count: expected 2, got {report['count']}")
            failed += 1
    except Exception as e:
        print(f"[FAIL] Crashed: {e}")
        failed += 1

    # Test 5: Empty month returns zero total
    try:
        report = generate_monthly_report(expenses, 3, 2024)
        if report["total"] == 0.0 and report["count"] == 0:
            print("[PASS] Empty month returns zero total and count")
            passed += 1
        else:
            print(f"[FAIL] Empty month: total={report['total']}, count={report['count']}")
            failed += 1
    except Exception as e:
        print(f"[FAIL] Crashed: {e}")
        failed += 1

    print(f"\\n{passed + failed} tests: {passed} passed, {failed} failed")

run_tests()`,
      },
    ],
    solutionExplanation: `### Root Cause

Inside the nested \`process_expense()\` function, \`total += expense.amount\` is an **augmented assignment**. Python sees the \`=\` and treats \`total\` as a **local variable**. But it tries to read \`total\` before assigning it (since \`+=\` reads then writes), causing \`UnboundLocalError\`.

\`\`\`python
def process_expense(expense):
    total += expense.amount  # UnboundLocalError
\`\`\`

The \`categories[cat] = ...\` line works fine because dict item assignment (\`__setitem__\`) is **mutation**, not variable rebinding. Python does not consider \`categories\` a local variable.

### Fix

Add \`nonlocal total\` to tell Python that \`total\` refers to the outer scope:

\`\`\`python
def process_expense(expense):
    nonlocal total
    total += expense.amount
\`\`\``,
  },

  // -----------------------------------------------------------------------
  // Bug 11 — Monthly Total Test Passes with Wrong Value
  // -----------------------------------------------------------------------
  {
    id: 'expense-tracker-11',
    project: 'expense-tracker',
    projectLabel: 'Expense Tracker',
    bugNumber: 11,
    title: 'Monthly Total Test Passes with Wrong Value',
    difficulty: 'hard',
    category: 'logic-error',
    language: 'python',
    symptom: `### Symptom

The \`calculate_monthly_total()\` function is supposed to return the total spending for a **specific month**. But it returns the total of **all** expenses regardless of month. The existing test passes because it expects the wrong value.

\`\`\`python
expenses = [
    Expense(50.0, "food", "Jan lunch", date(2024, 1, 15)),
    Expense(30.0, "food", "Jan dinner", date(2024, 1, 20)),
    Expense(20.0, "food", "Feb lunch", date(2024, 2, 5)),
]
result = calculate_monthly_total(expenses, month=1, year=2024)
# Returns 100.0 (all expenses) instead of 80.0 (January only)
\`\`\`

### What you know

The function accepts \`month\` and \`year\` parameters but seems to ignore them. Both the function implementation and its test are wrong -- they agree with each other but produce incorrect behavior.`,
    hints: [
      'Read the function body carefully. Does it actually use the `month` and `year` parameters?',
      'The function sums **all** expenses without filtering: `sum(e.amount for e in expenses)`. The `month` and `year` parameters are accepted but never used.',
      'Filter expenses by month and year before summing: `monthly = [e for e in expenses if e.expense_date.month == month and e.expense_date.year == year]`.',
    ],
    files: [
      {
        filename: 'reports.py',
        language: 'python',
        buggyCode: `"""Report generation for expense data."""
from datetime import date


class Expense:
    """A single expense entry."""
    def __init__(self, amount: float, category: str, description: str,
                 expense_date: date):
        self.amount = amount
        self.category = category
        self.description = description
        self.expense_date = expense_date

    def __repr__(self):
        return f"Expense(amount={self.amount}, category={self.category!r})"


def calculate_monthly_total(expenses: list, month: int, year: int) -> float:
    """Calculate total spending for a specific month."""
    return sum(e.amount for e in expenses)`,
        solutionCode: `"""Report generation for expense data."""
from datetime import date


class Expense:
    """A single expense entry."""
    def __init__(self, amount: float, category: str, description: str,
                 expense_date: date):
        self.amount = amount
        self.category = category
        self.description = description
        self.expense_date = expense_date

    def __repr__(self):
        return f"Expense(amount={self.amount}, category={self.category!r})"


def calculate_monthly_total(expenses: list, month: int, year: int) -> float:
    """Calculate total spending for a specific month."""
    monthly = [e for e in expenses if e.expense_date.month == month and e.expense_date.year == year]
    return sum(e.amount for e in monthly)`,
      },
    ],
    testFiles: [
      {
        filename: 'test_reports.py',
        language: 'python',
        code: `from datetime import date

# Expense class and calculate_monthly_total function are defined in the source file above

def run_tests():
    passed = 0
    failed = 0

    expenses = [
        Expense(50.0, "food", "Jan lunch", date(2024, 1, 15)),
        Expense(30.0, "food", "Jan dinner", date(2024, 1, 20)),
        Expense(20.0, "food", "Feb lunch", date(2024, 2, 5)),
    ]

    # Test 1: January total should be 80.0, not 100.0
    result = calculate_monthly_total(expenses, month=1, year=2024)
    if abs(result - 80.0) < 0.01:
        print("[PASS] January total is 80.0 (excludes February)")
        passed += 1
    else:
        print(f"[FAIL] January total: expected 80.0, got {result}")
        failed += 1

    # Test 2: February total should be 20.0
    result = calculate_monthly_total(expenses, month=2, year=2024)
    if abs(result - 20.0) < 0.01:
        print("[PASS] February total is 20.0")
        passed += 1
    else:
        print(f"[FAIL] February total: expected 20.0, got {result}")
        failed += 1

    # Test 3: Month with no expenses returns 0.0
    result = calculate_monthly_total(expenses, month=3, year=2024)
    if result == 0.0:
        print("[PASS] March total is 0.0 (no expenses)")
        passed += 1
    else:
        print(f"[FAIL] March total: expected 0.0, got {result}")
        failed += 1

    # Test 4: Wrong year returns 0.0
    result = calculate_monthly_total(expenses, month=1, year=2023)
    if result == 0.0:
        print("[PASS] January 2023 total is 0.0 (wrong year)")
        passed += 1
    else:
        print(f"[FAIL] January 2023 total: expected 0.0, got {result}")
        failed += 1

    # Test 5: Multiple months with distinct data
    more_expenses = expenses + [
        Expense(100.0, "travel", "March flight", date(2024, 3, 10)),
        Expense(40.0, "food", "March dinner", date(2024, 3, 15)),
    ]
    jan = calculate_monthly_total(more_expenses, month=1, year=2024)
    mar = calculate_monthly_total(more_expenses, month=3, year=2024)
    if abs(jan - 80.0) < 0.01 and abs(mar - 140.0) < 0.01:
        print("[PASS] Multi-month data: Jan=80.0, Mar=140.0")
        passed += 1
    else:
        print(f"[FAIL] Multi-month: Jan={jan} (expected 80.0), Mar={mar} (expected 140.0)")
        failed += 1

    print(f"\\n{passed + failed} tests: {passed} passed, {failed} failed")

run_tests()`,
      },
    ],
    solutionExplanation: `### Root Cause

The function accepts \`month\` and \`year\` parameters but **never uses them**:

\`\`\`python
def calculate_monthly_total(expenses, month, year):
    return sum(e.amount for e in expenses)  # Sums ALL expenses!
\`\`\`

It sums every expense regardless of date. The original test was also wrong -- it expected \`100.0\` (sum of all 3 expenses) instead of \`80.0\` (sum of only January expenses).

### Fix

Filter expenses by month and year before summing:

\`\`\`python
def calculate_monthly_total(expenses, month, year):
    monthly = [e for e in expenses
               if e.expense_date.month == month and e.expense_date.year == year]
    return sum(e.amount for e in monthly)
\`\`\``,
  },

  // -----------------------------------------------------------------------
  // Bug 12 — Large Expense Total Is Always $0
  // -----------------------------------------------------------------------
  {
    id: 'expense-tracker-12',
    project: 'expense-tracker',
    projectLabel: 'Expense Tracker',
    bugNumber: 12,
    title: 'Large Expense Total Is Always $0',
    difficulty: 'hard',
    category: 'generator-exhaustion',
    language: 'python',
    symptom: `### Symptom

The \`large_expense_summary()\` function returns the correct **count** of large expenses but the **total** is always \`0\`.

\`\`\`python
expenses = [
    Expense(200.0, "travel", "Flight", date(2024, 1, 1)),
    Expense(150.0, "food", "Dinner", date(2024, 1, 2)),
    Expense(50.0, "food", "Lunch", date(2024, 1, 3)),
]
result = large_expense_summary(expenses, threshold=100.0)
# result = {"count": 2, "total": 0, "threshold": 100.0}
#                               ^ should be 350.0!
\`\`\`

### What you know

The function calls \`get_large_expenses()\` to find expenses above the threshold, then counts them and sums their amounts. The count is correct but the total is zero.`,
    hints: [
      'Look at what `get_large_expenses()` returns. Is it a list or something else?',
      'It returns a **generator expression** `(e for ...)`. A generator can only be iterated once. The first iteration (counting) exhausts it, so the second iteration (summing) gets nothing.',
      'Change the generator expression to a list comprehension: `return [e for e in expenses if e.amount > threshold]`.',
    ],
    files: [
      {
        filename: 'filters.py',
        language: 'python',
        buggyCode: `"""Filtering and query functions for expenses."""
from datetime import date


class Expense:
    """A single expense entry."""
    def __init__(self, amount: float, category: str, description: str,
                 expense_date: date):
        self.amount = amount
        self.category = category
        self.description = description
        self.expense_date = expense_date

    def __repr__(self):
        return f"Expense(amount={self.amount}, category={self.category!r})"


def get_large_expenses(expenses: list, threshold: float = 100.0):
    """Return expenses above the given threshold."""
    return (e for e in expenses if e.amount > threshold)`,
        solutionCode: `"""Filtering and query functions for expenses."""
from datetime import date


class Expense:
    """A single expense entry."""
    def __init__(self, amount: float, category: str, description: str,
                 expense_date: date):
        self.amount = amount
        self.category = category
        self.description = description
        self.expense_date = expense_date

    def __repr__(self):
        return f"Expense(amount={self.amount}, category={self.category!r})"


def get_large_expenses(expenses: list, threshold: float = 100.0):
    """Return expenses above the given threshold."""
    return [e for e in expenses if e.amount > threshold]`,
      },
      {
        filename: 'reports.py',
        language: 'python',
        buggyCode: `"""Report generation for expense data."""


def large_expense_summary(expenses: list, threshold: float = 100.0) -> dict:
    """Summarize expenses above a given threshold."""
    large = get_large_expenses(expenses, threshold)
    count = sum(1 for _ in large)
    total = sum(e.amount for e in large)
    return {"count": count, "total": total, "threshold": threshold}`,
        solutionCode: `"""Report generation for expense data."""


def large_expense_summary(expenses: list, threshold: float = 100.0) -> dict:
    """Summarize expenses above a given threshold."""
    large = get_large_expenses(expenses, threshold)
    count = sum(1 for _ in large)
    total = sum(e.amount for e in large)
    return {"count": count, "total": total, "threshold": threshold}`,
      },
    ],
    testFiles: [
      {
        filename: 'test_reports.py',
        language: 'python',
        code: `from datetime import date

# Expense class, get_large_expenses, and large_expense_summary are defined in the source files above

def run_tests():
    passed = 0
    failed = 0

    expenses = [
        Expense(200.0, "travel", "Flight", date(2024, 1, 1)),
        Expense(150.0, "food", "Fancy dinner", date(2024, 1, 2)),
        Expense(50.0, "food", "Lunch", date(2024, 1, 3)),
        Expense(75.0, "transport", "Taxi", date(2024, 1, 4)),
    ]

    # Test 1: Count of large expenses is correct
    result = large_expense_summary(expenses, threshold=100.0)
    if result["count"] == 2:
        print("[PASS] Count of large expenses is 2")
        passed += 1
    else:
        print(f"[FAIL] Count: expected 2, got {result['count']}")
        failed += 1

    # Test 2: Total of large expenses is correct
    result = large_expense_summary(expenses, threshold=100.0)
    if abs(result["total"] - 350.0) < 0.01:
        print("[PASS] Total of large expenses is 350.0")
        passed += 1
    else:
        print(f"[FAIL] Total: expected 350.0, got {result['total']}")
        failed += 1

    # Test 3: get_large_expenses can be iterated multiple times
    large = get_large_expenses(expenses, threshold=100.0)
    first_pass = sum(1 for _ in large)
    second_pass = sum(1 for _ in large)
    if first_pass == second_pass:
        print("[PASS] get_large_expenses result can be iterated multiple times")
        passed += 1
    else:
        print(f"[FAIL] First iteration: {first_pass}, second iteration: {second_pass}")
        failed += 1

    # Test 4: No large expenses returns zero count and total
    small_expenses = [
        Expense(10.0, "food", "Coffee", date(2024, 1, 1)),
        Expense(20.0, "food", "Snack", date(2024, 1, 2)),
    ]
    result = large_expense_summary(small_expenses, threshold=100.0)
    if result["count"] == 0 and result["total"] == 0:
        print("[PASS] No large expenses: count=0, total=0")
        passed += 1
    else:
        print(f"[FAIL] Expected count=0, total=0, got count={result['count']}, total={result['total']}")
        failed += 1

    # Test 5: Custom threshold works correctly
    result = large_expense_summary(expenses, threshold=60.0)
    if result["count"] == 3 and abs(result["total"] - 425.0) < 0.01:
        print("[PASS] Threshold 60.0: count=3, total=425.0")
        passed += 1
    else:
        print(f"[FAIL] Threshold 60.0: expected count=3, total=425.0, got count={result['count']}, total={result['total']}")
        failed += 1

    print(f"\\n{passed + failed} tests: {passed} passed, {failed} failed")

run_tests()`,
      },
    ],
    solutionExplanation: `### Root Cause

\`get_large_expenses()\` returns a **generator expression** \`(e for ...)\` instead of a list. A generator can only be iterated **once**. In \`large_expense_summary()\`:

\`\`\`python
large = get_large_expenses(expenses, threshold)  # generator
count = sum(1 for _ in large)    # First iteration -- exhausts the generator
total = sum(e.amount for e in large)  # Second iteration -- generator is empty, returns 0
\`\`\`

The count works because it consumes the generator first. But by the time we try to sum amounts, the generator is exhausted and yields nothing.

### Fix

Return a list instead of a generator in \`get_large_expenses()\`:

\`\`\`python
return [e for e in expenses if e.amount > threshold]
\`\`\`

A list can be iterated any number of times.`,
  },
];
