export function processComment(comments: Array<any>) {
  try {
    // 处理结构
    for (const item of comments) {
      item.name = item.user.name;
      item.roles = item.user.roles;
      delete item.user;
      item.informationId = item.information.id;
      delete item.information;
    }
    const res: Array<any> = [];
    const map = new Map<number, any>();
    // 映射关系, 方便查找 comment
    for (const c of comments) {
      if (c.parent_id === null) {
        res.push(c);
      }
      map.set(c.id, c);
    }
    for (const c of comments) {
      if (c.parent_id !== null) {
        const parentC = map.get(c.parent_id);
        c.parentName = parentC.name;
      }
      const parentId = c.parent_id;
      if (parentId !== null) {
        const parentC = map.get(parentId);
        parentC.children || (parentC.children = []);
        parentC.children.push(c);
      }
    }

    return res;
  } catch (e) {
    console.log(e);
  }

  return comments;
}
