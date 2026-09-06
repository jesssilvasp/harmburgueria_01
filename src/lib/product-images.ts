const image = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=85`;

export const productImages: Record<string, string> = {
  "p-xbacon": image("photo-1568901346375-23c9450c58cd"),
  "p-cheddar": image("photo-1550547660-d9450f859349"),
  "p-smash": image("photo-1553979459-d2229ba7433b"),
  "p-salada": image("photo-1512621776951-a57141f2eefd"),
  "p-frango": image("photo-1606755962773-d324e0a13086"),
  "p-veggie": image("photo-1520072959219-c595dc870360"),
  "p-combo-turbo": image("photo-1571091718767-18b5b1457add"),
  "p-combo-classic": image("photo-1573080496219-bb080dd4f877"),
  "p-combo-duplo": image("photo-1565299624946-b28f40a0ae38"),
  "p-combo-familia": image("photo-1540189549336-e6e99c3679fe"),
  "p-batata-p": image("photo-1573080496219-bb080dd4f877"),
  "p-batata-g": image("photo-1573080496219-bb080dd4f877"),
  "p-onion": image("photo-1639024471283-03518883512d"),
  "p-nuggets": image("photo-1562967914-608f82629710"),
  "p-coca": image("photo-1544145945-f90425340c7e"),
  "p-guarana": image("photo-1551024506-0bccd828d307"),
  "p-suco": image("photo-1600271886742-f049cd451bba"),
  "p-agua": image("photo-1548839140-29a749e1cf4d"),
  "p-brownie": image("photo-1564355808539-22fda35bed7e"),
  "p-milkshake": image("photo-1579954115545-a95591f28bfc"),
  "p-cheesecake": image("photo-1578985545062-69928b1d9587"),
};
